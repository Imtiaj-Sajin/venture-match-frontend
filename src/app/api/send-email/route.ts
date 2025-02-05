import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

export async function POST(req: Request) {
    console.log('came to mail');
  try {
    const { subject, text, toEmail } = await req.json();

    // Setup nodemailer transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    console.log(process.env.UER_EMAIL)

    const mailOptions = {
      from: 'ksajin63@gmail.com', // Your email
      to: toEmail, // The recipient email
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email' }), {
      status: 500,
    });
  }
}
