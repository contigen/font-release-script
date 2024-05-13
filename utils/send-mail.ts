import { appendFile } from 'fs-extra'
import nodemailer from 'nodemailer'

export async function sendEmailNotification(text: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: `gmail`,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    })

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.APP_EMAIL,
      to: process.env.APP_EMAIL,
      subject: `Geist Release Update`,
      text: text,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Email notification sent successfully.`)
  } catch (err: any) {
    await appendFile(
      `error.txt`,
      `Error sending email notification: ${err.message} at ${new Date()} \n \n`
    )
  }
}
