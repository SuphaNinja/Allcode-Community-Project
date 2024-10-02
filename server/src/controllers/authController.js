import prisma from "../../prisma/Prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../EmailAssets/sendEmails.js";

export async function confirmEmail(req, res) {
    const { token, username } = req.body;

    if (!token) { return res.status(400).send({ error: "Token is has expired or does not exist." }) };
    if (!username) { return res.status(400).send({ error: "Username is undefined or does not exist." }) };

    try {
        const user = await prisma.user.findFirst({
            where: { userName: username }
        });

        if (!user) { return res.status(404).send({ error: "Could not find user to verify." }) };
        if (user.emailConfirmed) { return res.status(404).send({ error: "Email has already been verified." }) };

        const isTokenMatch = bcrypt.compare(token, user.emailConfirmationToken);
        if (!isTokenMatch) { return res.status(400).send({ error: "Invalid or expired token" }) };

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailConfirmed: true,
                emailConfirmationToken: null
            },
        });

        res.status(200).send({
            success: "Email confirmed successfully!",
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "4h" }),
        });

    } catch (error) {
        console.log("error trying to verify the email: ", error)
        res.status(500).send({ error: "Something went wrong when trying to verify your email, please try again later." });
        return;
    };
};

export async function resetPassword(req, res) {
    const { email } = req.body;

    const token = randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    if (!email) { return res.status(400).send({ error: "Token is has expired or does not exist." }) };

    try {
        const user = await prisma.user.update({
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpiresAt: addHours(new Date(), 2),
            },
        });

        if (!user) { return res.status(404).send({ error: "Could not find user with that email adress." }) };

        const encodedToken = encodeURIComponent(user.resetPasswordToken);

        await sendResetPasswordEmail(email, encodedToken);

        res.status(200).send({ success: "An email with instuctions to reset your password has been send to you." });

    } catch (error) {
        console.log("error trying to reset the password: ", error)
        res.status(500).send({ error: "Something went wrong when trying to reset your, please try again later." });
        return;
    };
};

export async function updatePassword(req, res) {
    const { newPassword, email, token } = req.body;

    if (!newPassword) { return res.status(400).send({ error: "The new password has to be submitted." }) };
    if (!token) { return res.status(400).send({ error: "No token was provided." }) };
    if (!email) { return res.status(400).send({ error: "No email was provided." }) };

    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) { return res.status(404).send({ error: "Could not find user with that email adress." }) };

        if (token !== user.resetPasswordToken) { return res.status(400).send({ error: "The token provided is invalid, please try again later." }) };

        const isPasswordSame = await bcrypt.compare(newPassword, user.password);
        if (isPasswordSame) { return res.status(400).send({ error: "The new password cannot be the same as the old one." }) };

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedNewPassword,
                reserPasswordToken: null
            }
        });

        res.status(200).send({
            success: 'Your password has been reset successfully.',
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "4h" }),
        });


    } catch (error) {
        console.log("error trying to reset the password: ", error)
        res.status(500).send({ error: "Something went wrong when trying to reset your, please try again later." });
        return;
    };
};

