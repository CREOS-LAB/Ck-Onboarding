import Container, { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import generateToken, { generateTokenForForgotPassword } from "../utils/generateToken";
import "reflect-metadata"
import { TeacherServices } from "../services/TeacherService";
import EmailService from "../services/EmailService";
import Teacher from "../models/teachers.model";
import { encodePassword } from "../config/bcrypt";

@Service()
class teacherControllers{
    constructor(private readonly teacherServices: TeacherServices,
        private readonly emailServices: EmailService
        ){

    }

    async signUp(req: any, res: Response){
        try{
            const data = req.body;
            data.school = req.user
            let result: ResponseInterface = await this.teacherServices.signUp(data);
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async signIn(req: Request, res: Response){
        try{
            const data: any = req.body;
            let result: ResponseInterface = await this.teacherServices.signIn(data, res);
            
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            console.log(err)
            reject(err.message, 400, res)
        }
    }

    async getTeacherById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.teacherServices.getteacherByEmail(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getTeacherByEmail(req: Request, res: Response, next: NextFunction){
        try{
            let {email} = req.params;
            let result = await this.teacherServices.getteacherById(email)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getLoggedInTeacher(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const user = await this.teacherServices.getteacherById(_id)
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

    async updateTeacher(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const {firstName, lastName, profilePicture} = req.body;
            let data: any = {firstName, lastName, profilePicture}
            data = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => value != null)
            );

            let result = await this.teacherServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteTeacher(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.teacherServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async search(req: any, res: Response, next: NextFunction){
        try{
            const {name} = req.query;
            let result = await this.teacherServices.search(name);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: any, res: Response, next: NextFunction){
        try{
            let result = await this.teacherServices.getAll();
            resolve("Successful", result, 200, res)   
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAllBySchool(req: any, res: Response, next: NextFunction){
        try{
            let school = req.user;
            let result = await this.teacherServices.getAllBySchool(school);
            resolve("Successful", result, 200, res) 
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async forgotPassword(req: Request, res: Response){
        try{
            const {email} = req.body;
            let teacher: any = await this.teacherServices.getteacherByEmail(email)
            if(!teacher){
                reject("Invalid email", 400, res)
            }
            let token = generateTokenForForgotPassword(teacher._id);
            teacher.resetPasswordToken = token
            teacher.resetTokenExpires = Date.now() + 3600000; // 1 hour
            let result = this.teacherServices.update(teacher._id, teacher)
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
            let teacher: any = await Teacher.find({
                resetPasswordToken: token,
                resetTokenExpires: { $gt: Date.now() }
            })

            if(!teacher){
                reject("Token is Expired or Invalid", 400, res)
            }

            teacher.password = encodePassword(password);
            teacher.resetPasswordToken = null;
            teacher.resetTokenExpires = null;
            this.teacherServices.update(teacher._id, teacher)
            resolve("Reset Succesful", null, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}

export interface ResponseInterface{
    message: string,
    payload?: any,
    token?: string,
    status: number
}


export default teacherControllers