import { Service } from "typedi";
import { comparePassword, encodePassword } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";
import { Response } from "express";
import EmailService from "./email.service";
import UploadedStudent from "../models/uploadedStudent.model";
import { number } from "joi";

@Service()
export class UploadedStudentServices{
    constructor(
        private readonly uploadedStudent = UploadedStudent,
        private readonly emailService : EmailService
        ){

    }

    async uploadStudent(data: any){

        // let dateParts = data.dob.split("/");
        // data.dob = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

        const uploadedStudent = await new this.uploadedStudent(data).save()
        return {
            payload: uploadedStudent,
            message: "Signed Up Successfully",
            status: 201
        }
    }

    async getuploadedStudentByEmail(email: string){
        let uploadedStudent = await this.uploadedStudent.findOne({email}).populate("productKey")
        return uploadedStudent
    }

    async getAllBySchool(school: any){
        let result = await this.uploadedStudent.count({productKey: String(school.productKey)});
        return result;
    }
}