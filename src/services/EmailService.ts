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
                <p> Here are your details </p>
                <p>email: ${email} </p>
                <p>product key: ${productKey} </p>
            </div>
        `
        }
        html = html(email, password, productKey)
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }

    async sendTeacherSignUpDetails(email: string, password: string){
        let html: any = (email: string, password: string)=>{
            return `
            <div>
                <h3> Welcome to Curious Kids </h3>
                <p> Here are your details </p>
                <p>email: ${email} </p>
                <p>password: ${password} </p>
                <p>click here to <a href="https://ck-kids-dashboard.vercel.app/teachers-signin"> login </a> </p>
            </div>
        `
        }
        html = html(email, password)
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }

    async sendInviteToStudent(email: string, productKey: string){
        let html: any = ()=>{
            return `
            <div>
                <h3> Welcome to Curious Kids </h3>
                <p>Hi, You've been invited to <a href="https://ck-kids-dashboard.vercel.app"> Curious Kids </a> </p>\<p>Product Key: ${productKey} </p>
                <p>click here to <a href="https://ck-kids-dashboard.vercel.app/teachers-signin"> get started </a> </p>
            </div>
        `
        }
        html = html()
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }

    sendMessageFromWebsiteToAdminMail(details: any){
        let html: any = ()=>{
            return `
                <div>
                    <h3> ${details.firstName} Just sent a message to you </h3>
                    <p> user's email: ${details.email} </p>
                    <p> Message: <b>${details.message}</b> </p>
                </div>
            `
        }
        html = html()
        this.mail("eolaosebikan60@gmail.com", details.firstName, "You got a message.", html)
    }
}

export default EmailService