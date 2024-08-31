import React from 'react'; // Ensure React is imported
import { Resend } from 'resend';
import ConfirmationEmail from '../dist/EmailAssets/ConfirmationEmail.js';
import ReactDOMServer from 'react-dom/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailConfirmation(email, firstName, lastName, userName, token) {
    const confirmationUrl = `http://localhost:5173/confirm-email/token/${token}/username/${userName}`;
    console.log("username: ", userName)
    try {
        const emailContent = React.createElement(ConfirmationEmail, { confirmationUrl, firstName, lastName});
        const emailHtml = ReactDOMServer.renderToString(emailContent);

        await resend.emails.send({
            from: 'info@jhc-platbyggab.com',
            to: email,
            subject: 'Please confirm your email',
            html: emailHtml,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        resend.status(500).send({error: "Error sending email."});
        return;
    }
}
