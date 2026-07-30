const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If SMTP is configured, create real transport; otherwise log to console for dev
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_HOST !== 'smtp.mailtrap.io' &&
    process.env.SMTP_EMAIL !== 'your_smtp_username'
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const message = {
      from: `${process.env.FROM_NAME || 'PulseFit Studio'} <${process.env.FROM_EMAIL || 'noreply@pulsefitstudio.com'}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    const info = await transporter.sendMail(message);
    console.log(`[Email Sent] Message ID: ${info.messageId}`);
    return info;
  } else {
    console.log(`\n========== [DEV EMAIL STUB SENT] ==========`);
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content:\n${options.message}`);
    console.log(`===========================================\n`);
    return { messageId: 'dev-mock-id-' + Date.now() };
  }
};

module.exports = sendEmail;
