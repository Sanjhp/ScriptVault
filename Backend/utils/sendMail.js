import nodemailer from 'nodemailer';
import 'dotenv/config'

const sendMail = async mailOptions => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    })

    console.log('Sending mail to user ....')

    await transporter.sendMail(mailOptions)
    return 'success'
  } catch (error) {
    console.error('Error sending password reset email to user :', error)
    return 'error'
  }
}

export default sendMail;
