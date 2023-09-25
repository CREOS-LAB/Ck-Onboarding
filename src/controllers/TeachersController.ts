import Container, { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import { LoginDto } from "../dto/studentDTO";
import generateToken from "../utils/generateToken";
import "reflect-metadata"
import { TeacherServices } from "../services/TeacherService";

@Service()
class teacherControllers{
    constructor(private readonly teacherServices: TeacherServices){

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
            const data: LoginDto = req.body;
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
}

export interface ResponseInterface{
    message: string,
    payload?: any,
    token?: string,
    status: number
}


export default teacherControllers