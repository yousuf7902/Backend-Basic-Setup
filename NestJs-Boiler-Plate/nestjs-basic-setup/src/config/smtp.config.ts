import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",

    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_APP_PASS,
    }
})

export default transporter;
