import nodemailer from "nodemailer";
import "reflect-metadata"
import { Service } from "typedi";
import { sendInviteToStudentHTML, sendMessageFromWebsiteToAdminMailHTML, sendResetPasswordHTML, sendSchoolSignUpDetailsHTML, sendTeacherSignUpDetailsHTML } from "../utils/email-template";

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
        let html = sendSchoolSignUpDetailsHTML(email, password, productKey)
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }

    async sendTeacherSignUpDetails(email: string, password: string, schoolName: string){
        
        let html = sendTeacherSignUpDetailsHTML(email, password, schoolName)
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }

    async sendInviteToStudent(email: string, productKey: string, schoolName: string){
        let html = sendInviteToStudentHTML(email, productKey, schoolName)
        this.mail(email, "Emmy", "Welcome to Curious Kids", html)
    }

    sendMessageFromWebsiteToAdminMail(details: any){
        let html = sendMessageFromWebsiteToAdminMailHTML(details)
        this.mail("eolaosebikan60@gmail.com", details.firstName, "You got a message.", html)
    }

    sendResetPassword(email: string, token: string, type: number){
        let html = sendResetPasswordHTML(email, token, type)
        this.mail(email, "Emmy", "Reset Password.", html)
    }
}

export default EmailService