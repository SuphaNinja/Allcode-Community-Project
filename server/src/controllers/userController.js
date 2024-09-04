import prisma from "../../prisma/Prisma.js";
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import bcrypt from 'bcrypt';
import { sendEmailConfirmation } from "../EmailAssets/sendEmails.js"
import jwt from "jsonwebtoken";

export async function createUser(req, res) {

    const signUpData = req.body;

    const token = randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    const hashedPassword = await bcrypt.hash(signUpData.password, 10);

    try {
        const createdUser = await prisma.user.create({
            data: {
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                userName: signUpData.userName,
                email: signUpData.email,
                password: hashedPassword,
                emailConfirmationToken: hashedToken,
                emailConfirmationExpiresAt: addHours(new Date(), 2),
            },
        });

        await sendEmailConfirmation(createdUser.email, createdUser.firstName, createdUser.lastName, createdUser.userName, token);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'User creation failed' });
        return;
    };
};

export async function login(req, res) {
    const loginData = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { userName: loginData.username },
                    { email: loginData.email }
                ]
            }
        });

        if (!user) { return res.status(404).send({ error: "Could not find user." }) };

        const isPassMatch = bcrypt.compare(loginData.password, user.password);
        if (!isPassMatch) { return res.status(400).send({ error: "Password or email is incorrect." }) };

        res.status(200).send({
            success: 'User logged in successfully',
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "4h" }),
        });

    } catch (error) {
        console.log("error trying to login: ", error)
        res.status(500).send({ error: "Something went wrong when trying to verify your email, please try again later." });
        return;
    };
};

export async function getCurrentUser(req, res) {
    const userId = req.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) { return res.status(404).send({ error: "User could not be found!" }) };

        const { password, ...userWithoutPass } = user;
        res.status(200).send({ success: userWithoutPass });

    } catch (error) {
        res.status(500).send({ error: "Something went wrong, please try again later." })
        return;
    };
};

