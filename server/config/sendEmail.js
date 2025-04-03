import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.RESEND_API_KEY) {
    console.log('Provide RESEND_API_KEY in the .env file');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// send an email
// why async function? because we want to wait for the email to be sent before moving on to the next line of code
const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'E-Bazar <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data;

    } catch (error) {
        console.log(error);

    }
};

export default sendEmail
