import prisma from "../prisma/Prisma.js";
import bcrypt from "bcrypt";

export async function confirmEmail(req, res) {
    const { token, username } = req.body;

    if (!token) { return res.status(400).send({ error: "Token is has expired or does not exist." }) };
    if (!username) { return res.status(400).send({ error: "Username is undefined or does not exist." }) };

    try {
        const user = await prisma.user.findFirst({
            where: { userName: username }
        });

        if (!user) { return res.status(404).send({error: "Could not find user to verify."}) };
        if (user.emailConfirmed) { return res.status(404).send({ error: "Email has already been verified." }) };
        
        const isTokenMatch = bcrypt.compare(token, user.emailConfirmationToken);
        if (!isTokenMatch) { return res.status(400).send({ error: "Invalid or expired token" }) };

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailConfirmed: true,
            },
        });

        res.status(200).json({ success: 'Email confirmed successfully' });

    } catch (error) {
        console.log("error trying to verify the email: ", error)
        res.status(500).send({error: "Something went wrong when trying to verify your email, please try again later."});
        return;
    }
}

