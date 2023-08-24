import { Service } from "typedi";
import StudentServices from "../services/StudentsServices";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import { LoginDto } from "../dto/studentDTO";
import generateToken from "../utils/generateToken";

interface ResponseInterface{
    message: string,
    payload?: any,
    status?: number
}

@Service()
class StudentsControllers{
    constructor(private readonly studentsServices: StudentServices){

    }

    async signUp(req: Request, res: Response){
        try{
            const data = req.body;
            let result: ResponseInterface = await this.studentsServices.signUp(data);
            resolve(result.message, result.payload, 200, res)
        }
        catch(err: any){
            reject(err.message, err.status, res)
        }
    }

    async signIn(req: Request, res: Response){
        try{
            const data: LoginDto = req.body;
            let result: ResponseInterface = await this.studentsServices.signIn(data);
            if(result.payload){
                generateToken(result.payload._id, result.payload.email, res)
            }
            resolve(result.message, result.payload, 200, res)
        }
        catch(err: any){
            reject(err.message, err.status, res)
        }
    }

    async getStudentById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.studentsServices.getStudentById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, err.status, res)
        }
    }
}