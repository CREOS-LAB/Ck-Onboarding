import { Service } from "typedi";
import { comparePassword, encodePassword } from "../config/bcrypt";
import generateToken from "../utils/generateToken";
import { Response } from "express";
import EmailService from "./EmailService";
import UploadedStudent from "../models/uploadedStudent.model";

@Service()
export class UploadedStudentServices{
    constructor(
        private readonly uploadedStudent = UploadedStudent,
        private readonly emailService : EmailService
        ){

    }

    async uploadStudent(data: any){
        const uploadedStudent = await new this.uploadedStudent(data).save()
        return {
            payload: uploadedStudent,
            message: "Signed Up Successfully",
            status: 201
        }
    }

    async getuploadedStudentByEmail(email: string){
        let uploadedStudent = await this.uploadedStudent.findOne({email})
        return uploadedStudent
    }
}