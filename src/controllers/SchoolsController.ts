import { Service } from "typedi";
import "reflect-metadata"
import { SchoolsServices } from "../services/SchoolsServices";
import { ResponseInterface } from "./StudentsControllers";
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dto/studentDTO";
import generateToken, { generateTokenForForgotPassword } from "../utils/generateToken";
import { ProductKeyService } from "../services/ProductKeyServices";
import { UploadedStudentServices } from "../services/UploadedStudentServices";
import { StudentServices } from "../services/StudentsServices";
import { TeacherServices } from "../services/TeacherService";
import School from "../models/schools.model";
import { encodePassword } from "../config/bcrypt";
import EmailService from "../services/EmailService";

@Service()
export class SchoolsController{
    constructor(
        private readonly schoolServices : SchoolsServices,
        private readonly productKey: ProductKeyService,
        private readonly uploadedStudents: UploadedStudentServices,
        private readonly studentServices: StudentServices,
        private readonly teacherServices: TeacherServices,
        private readonly emailServices: EmailService
        ){}

    async signUp(req: Request, res: Response){
        try{
            const data = req.body;
            data.productKey = await this.productKey.generateKey()
            let result: ResponseInterface = await this.schoolServices.signUp(data);
            resolve(result.message, result.payload, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async signIn(req: Request, res: Response){
        try{
            const data: LoginDto = req.body;
            let result: ResponseInterface = await this.schoolServices.signIn(data, res);
            
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getSchoolById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.schoolServices.getSchoolById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getSchoolDetails(req: any, res: Response, next: NextFunction){
        try{
            let user = req.user;
            let school;

            if(user?.school){
                school = user.school
            }
            else{
                school = user;
            }
            
            let allUploadedStudents = await this.uploadedStudents.getAllBySchool(school);
            let totalStudents: any = await this.studentServices.getStudentsBySchool(school);
            totalStudents = totalStudents.length;
            let totalTeachers: any = await this.teacherServices.getAllBySchool(school);
            totalTeachers = totalTeachers.length;

            let result = {allUploadedStudents, totalStudents, totalTeachers}
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getSchoolByEmail(req: Request, res: Response, next: NextFunction){
        try{
            let {email} = req.params;
            let result = await this.schoolServices.getSchoolByEmail(email)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getLoggedInSchool(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const user = await this.schoolServices.getSchoolById(_id)
            resolve("Successful", user, 200, res)
            
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try{
            res.cookie("jwt", "", {
                httpOnly: true,
                expires: new Date()
            })
            res.json({message: "Logged Out Successfully"})
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async updateSchool(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const {schoolName, profilePicture} = req.body;
            let data: any = {schoolName, profilePicture}
            data = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => value != null)
            );
            let result = await this.schoolServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteSchool(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.schoolServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: any, res: Response, next: NextFunction){
        try{
            let result = await this.schoolServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async forgotPassword(req: Request, res: Response){
        try{
            const {email} = req.body;
            let school: any = await this.schoolServices.getSchoolByEmail(email)
            if(!school){
                reject("Invalid email", 400, res)
            }
            let token = generateTokenForForgotPassword(school._id);
            school.resetPasswordToken = token
            school.resetTokenExpires = Date.now() + 3600000; // 1 hour
            let result = this.schoolServices.update(school._id, school)
            this.emailServices.sendResetPassword(email, token)
            resolve("Check your Mail Inbox", null, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async resetPassword(req: Request, res: Response){
        try{
            const {token, password} = req.body;
            let school: any = await School.find({
                resetPasswordToken: token,
                resetTokenExpires: { $gt: Date.now() }
            })

            if(!school){
                reject("Token is Expired or Invalid", 400, res)
            }

            school.password = encodePassword(password);
            school.resetPasswordToken = null;
            school.resetTokenExpires = null;
            this.schoolServices.update(school._id, school)
            resolve("Reset Succesful", null, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

}