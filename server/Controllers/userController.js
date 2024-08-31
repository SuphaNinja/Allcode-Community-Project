import prisma from "../prisma/Prisma.js"; 
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import bcrypt from 'bcrypt';
import { sendEmailConfirmation } from "../EmailAssets/sendEmailConfirmation.js";


export async function createUser(req, res) {

    const signUpData = req.body;
    console.log(signUpData)

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

        await sendEmailConfirmation(createdUser.email, createdUser.firstName, createdUser.lastName,createdUser.userName, token);

        res.status(200).json(createdUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'User creation failed' });
        return;
    }
}

