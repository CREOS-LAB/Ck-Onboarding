import nodemailer from "nodemailer";
import "reflect-metadata"
import { Service } from "typedi";

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS || "eolaosebikan60@gmail.com",
      pass: process.env.EMAIL_TEST_PASSWORD || "zrheordooredhgxv"
    }
  });


@Service()
class EmailService{
    constructor(){

    }

    async mail(receiver: string, sender: string, subject: string, html: string){
        const mailOptions = {
            from: `${sender}<${process.env.EMAIL_ADDRESS}>`,
            to: receiver,
            subject: subject,
            html: html
          };
          
    
          transporter.sendMail(mailOptions, (error, info) => {
            console.log("sending...")
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }

    async sendSignUpDetails(email: string, password: string, productKey: any){
        let html: any = (email: string, password: string, productKey: string)=>{
            return `
            <div>
                <h3> Welcome to Curious Kids </h3>
                <p> Here are you details </p>
                <p>email: ${email} </p>
                <p>password: ${password} </p>
                <p>product key: ${productKey} </p>
            </div>
        `
        }
        html = html(email, password, productKey)
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }
}

export default EmailService