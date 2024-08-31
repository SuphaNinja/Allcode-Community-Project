import { Body, Container, Head, Html, Section } from '@react-email/components';
import React from 'react';
export default function ConfirmationEmail({ confirmationUrl, firstName, lastName }) {
    return (React.createElement(Html, { lang: "sv" },
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
              text: #d3d3d3
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
                    React.createElement("h1", null,
                        "Hello ",
                        firstName,
                        " ",
                        lastName,
                        ","),
                    React.createElement("p", null, "Thank you for joining the AllCode community project."),
                    React.createElement("p", null, "Before you can continue, please verify your email by clicking the button below:"),
                    React.createElement("a", { href: confirmationUrl, className: "button" }, "Verify Your Email"),
                    React.createElement("p", { className: "footer" }, "If you did not create an account with us, please ignore this email."))))));
}
