import React from 'react';
import { Resend } from 'resend';
import ConfirmationEmail from '../../dist/EmailAssets/ConfirmationEmail.js';
import ReactDOMServer from 'react-dom/server';
import ResetPasswordEmail from '../../dist/EmailAssets/ResetPasswordEmail.js';


const resend = new Resend(process.env.RESEND_API_KEY);
const isLocal = process.env.NODE_ENV === "LOCAL";

export async function sendEmailConfirmation(email, firstName, lastName, userName, token) {
    const confirmationUrl = `${isLocal ? "http://localhost:5173" : "https://www.allcodecommunity.com"}/confirm-email/token/${token}/username/${userName}`;
    try {
        const emailContent = React.createElement(ConfirmationEmail, { confirmationUrl, firstName, lastName});
        const emailHtml = ReactDOMServer.renderToString(emailContent);

        await resend.emails.send({
            from: 'info@jhc-platbygg.com',
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

export async function sendResetPasswordEmail(email, token) {
    const resetUrl = `${isLocal ? "http://localhost:5173" : "https://www.allcodecommunity.com"}/update-password/token/${token}/email/${email}`;
    
    try {
        const emailContent = React.createElement(ResetPasswordEmail, { resetUrl, email });
        const emailHtml = ReactDOMServer.renderToString(emailContent);

        await resend.emails.send({
            from: 'noreply@allcodecommunity.com',
            to: email,
            subject: 'Reset Password',
            html: emailHtml,
        });

    } catch (error) {
        console.error("Error sending email:", error);
        resend.status(500).send({ error: "Error sending email." });
        return;
    }
}
