import nodemailer from 'nodemailer';
import config from '../config.json';

export default async function sendEmail({ to, subject, html, from }: any) {
  const emailFrom = from || process.env.EMAIL_FROM || config.emailFrom;
  const smtpOptions = {
    host: process.env.SMTP_HOST || config.smtpOptions.host,
    port: Number(process.env.SMTP_PORT) || config.smtpOptions.port,
    auth: {
      user: process.env.SMTP_USER || config.smtpOptions.auth.user,
      pass: process.env.SMTP_PASS || config.smtpOptions.auth.pass
    }
  };

  const transporter = nodemailer.createTransport(smtpOptions);
  await transporter.sendMail({ from: emailFrom, to, subject, html });
}