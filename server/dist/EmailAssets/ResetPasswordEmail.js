import { Body, Container, Head, Html, Section } from '@react-email/components';
import React from 'react';
export default function ResetPasswordEmail({ resetUrl, email }) {
    return (React.createElement(Html, { lang: "en" },
        React.createElement(Head, null,
            React.createElement("style", null, `
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              color: #ffffff;
              background-color: #1c1c1c;
              width: 100%;
              text-align: center;
              box-sizing: border-box;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #2c2c2c;
              border-radius: 10px;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
              padding: 30px;
            }
            h1 {
              color: #ffffff;
              font-size: 28px;
              margin: 0;
              padding: 20px 0;
              text-align: center;
            }
            p {
              font-size: 18px;
              color: #ffffff;
              margin: 20px 0; /* Increased margin for spacing between paragraphs */
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              font-size: 18px;
              color: #ffffff;
              background-color: #000000;
              text-decoration: none;
              border-radius: 8px;
              margin-top: 20px;
              font-weight: 600;
              transition: background-color 0.3s ease;
              text-align: center;
            }
            .button:hover {
              background-color: #555555;
            }
            .footer {
              margin-top: 30px;
              font-size: 16px;
              color: #cccccc;
              line-height: 1.5;
            }
          `)),
        React.createElement(Body, null,
            React.createElement(Container, { className: "container" },
                React.createElement(Section, null,
                    React.createElement("h1", null, "Password Reset Request"),
                    React.createElement("p", null,
                        "Hi ",
                        email,
                        ","),
                    React.createElement("p", null, "We received a request to reset your password. Click the button below to reset it:"),
                    React.createElement("a", { href: resetUrl, className: "button" }, "Reset Your Password"),
                    React.createElement("p", null, "If you didn't request a password reset, please ignore this email or contact support if you have questions."),
                    React.createElement("p", { className: "footer" }, "Thank you for using our service!"))))));
}
