import { Service } from "typedi";
import "reflect-metadata"
import { SchoolsServices } from "../services/school.service";
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { generateTokenForForgotPassword, generateUserToken } from "../utils/generateToken";
import { UploadedStudentServices } from "../services/uplodaded_students.service";
import { StudentServices } from "../services/student.service";
import { TeacherServices } from "../services/teacher.service";
import { SchoolModel } from "../models/schools.model";
import { encodePassword } from "../utils/bcrypt";
import EmailService from "../services/email.service";
import { AuthUser } from "../passport/types";
import { SendResponseOrError, SuccessResponse } from "../response";

@Service()
export class SchoolsController {
    constructor(
        private readonly schoolServices: SchoolsServices,
        private readonly uploadedStudents: UploadedStudentServices,
        private readonly studentServices: StudentServices,
        private readonly teacherServices: TeacherServices,
        private readonly emailServices: EmailService
    ) {

    }

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        return SendResponseOrError({
            value: this.schoolServices.signUp(req.body),
            res, next
        })
    }

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        return SendResponseOrError({
            value: this.schoolServices.signIn(req.body),
            res, next
        })
    }

    signInGoogle = async (err: any, req: Request, res: Response, next: NextFunction) => {
      


        return SendResponseOrError({
            value: this.schoolServices.signInGoogle(req.user as AuthUser),
            res, next
        })
    }


    getSchoolById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { id } = req.params;
            let result = await this.schoolServices.getSchoolById(id)
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    getSchoolDetails = async (req: Request, res: Response, next: NextFunction) => {
        return SendResponseOrError({
            value: this.schoolServices.getSchoolDetails(req.user as AuthUser),
            res, next
        })
    }



    getSchoolByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { email } = req.params;
            let result = await this.schoolServices.getSchoolByEmail(email)
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    getLoggedInSchool = async (req: Request, res: Response, next: NextFunction) => {
        return SendResponseOrError({
            value: this.schoolServices.getLoggedInSchool(req.user as AuthUser),
            res, next
        })
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("auth", "", {
                httpOnly: true,
                expires: new Date()
            })
            res.json({ message: "Logged Out Successfully" })
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    updateSchool = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user;
            const { schoolName, profilePicture } = req.body;
            let data: any = { schoolName, profilePicture }
            data = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => value != null)
            );
            let result = await this.schoolServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    deleteSchool = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user;
            let result = await this.schoolServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    getAll = async (req: any, res: Response, next: NextFunction) => {
        try {
            let result = await this.schoolServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            let school: any = await this.schoolServices.getSchoolByEmail(email)
            if (!school) {
                reject("Invalid email", 400, res)
            }
            let token = generateTokenForForgotPassword(school._id);
            school.resetPasswordToken = token
            school.resetTokenExpires = Date.now() + 3600000; // 1 hour
            let result = this.schoolServices.update(school._id, school)
            this.emailServices.sendResetPassword(email, token, 3)
            resolve("Check your Mail Inbox", null, 200, res);
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            const { token, password } = req.body;
            let school: any = await SchoolModel.find({
                resetPasswordToken: token,
                resetTokenExpires: { $gt: Date.now() }
            })

            if (!school) {
                reject("Token is Expired or Invalid", 400, res)
            }

            school.password = encodePassword(password);
            school.resetPasswordToken = null;
            school.resetTokenExpires = null;
            this.schoolServices.update(school._id, school)
            resolve("Reset Succesful", null, 200, res);
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }
}