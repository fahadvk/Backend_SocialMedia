import nodemailer from 'nodemailer'
import { adminAuth } from '../Config/FirebaseConfig';


const transporter = nodemailer.createTransport({
  host: "Your hsot",
  port: 3333,
  auth: {
    user: "username",
    pass: "password"
  }
})

export const emailVerification = async  (email:string) => {
        const first_name = "Francisco"
        try {
            adminAuth.generateEmailVerificationLink(email)
            .then(async(emailLink) => {
                console.log(emailLink,email,"ds");
                const uid = await (await adminAuth.getUserByEmail(email)).uid;


                await  await transporter.sendMail({
                  from: "Francisco Inoque <accounts@franciscoinoque.tech>",
                  to: email,
                  subject: "Email Verification",
                  html: `Hello ${first_name}, to verify your email please, <a href="${emailLink}"> click here </a>`
                })

                return  ({success_msg: "please check in your inbox, we sent verification email"})

            }).catch(error => {
                console.log(error);
                return (error)
            })
        } catch (error) {
            return (error)  
        }


    }
