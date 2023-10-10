import Container, { Service } from "typedi";
import {StudentServices} from "../services/StudentsServices";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import { LoginDto } from "../dto/studentDTO";
import generateToken, { generateTokenForForgotPassword } from "../utils/generateToken";
import "reflect-metadata"
import EmailService from "../services/EmailService";
import Student from "../models/students.model";
import { encodePassword } from "../config/bcrypt";

@Service()
class StudentsControllers{
    constructor(private readonly studentsServices = Container.get(StudentServices),
        private readonly emailService : EmailService
    ){

    }

    async signUp(req: Request, res: Response){
        try{
            const data = req.body;
            let result: ResponseInterface = await this.studentsServices.signUp(data);
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async signIn(req: Request, res: Response){
        try{
            const data: LoginDto = req.body;
            let result: ResponseInterface = await this.studentsServices.signIn(data, res);
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            console.log(err)
            reject(err.message, 400, res)
        }
    }

    async getStudentById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.studentsServices.getStudentById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getStudentByEmail(req: Request, res: Response, next: NextFunction){
        try{
            let {email} = req.params;
            let result = await this.studentsServices.getStudentByEmail(email)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getLoggedInStudent(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let user = await this.studentsServices.setStreak(_id)
            // const user = await this.studentsServices.getStudentById(_id)
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

    async deleteStudent(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.studentsServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async leaderBoard(req: any, res: Response){
        try{
            const {limit} = req.query;
            let user = req.user;
            let id;

            if(user?.school){
                id = user.school
            }
            else{
                id = user;
            }

            let result = await this.studentsServices.getLeaderBoard(Number(limit), id);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: any, res: Response){
        try{
            let school;
            let user = req?.user;
            if(user?.school){
                school = user?.school
            }
            else{
                school = user?._id;
            }

            let result = await this.studentsServices.getAllStudents(school)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async updateStudent(req: any, res:Response){
        try{
            let student = req.user;
            let {firstName, lastName, profilePicture} = req.body;
            let studentData: any =  {firstName, lastName, profilePicture};
            studentData = Object.fromEntries(
                Object.entries(studentData).filter(([key, value]) => value != null)
              );

            let result = await this.studentsServices.update(student._id, studentData)
            resolve("Updated Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async forgotPassword(req: Request, res: Response){
        try{
            const {email} = req.body;
            let student: any = await this.studentsServices.getStudentByEmail(email)
            if(!student){
                reject("Invalid email", 400, res)
            }
            let token = generateTokenForForgotPassword(student._id);
            student.resetPasswordToken = token
            student.resetTokenExpires = Date.now() + 3600000; // 1 hour
            let result = this.studentsServices.update(student._id, student)
            console.log(result)
            this.emailService.sendResetPassword(email, token)
            resolve("Check your Mail Inbox", null, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async resetPassword(req: Request, res: Response){
        try{
            const {token, password} = req.body;
            let student: any = await Student.find({
                resetPasswordToken: token,
                resetTokenExpires: { $gt: Date.now() }
            })

            if(!student){
                reject("Token is Expired or Invalid", 400, res)
            }

            student.password = encodePassword(password);
            student.resetPasswordToken = null;
            student.resetTokenExpires = null;
            this.studentsServices.update(student._id, student)
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


export default StudentsControllers