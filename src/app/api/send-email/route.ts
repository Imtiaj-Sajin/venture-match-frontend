import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { subject, text, toEmail } = await req.json();

    // Setup nodemailer transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ksajin63@gmail.com',
        pass: 'qung glcv upgz zfqz',
      },
    });

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
