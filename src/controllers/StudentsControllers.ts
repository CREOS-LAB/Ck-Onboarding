import Container, { Service } from "typedi";
import {StudentServices} from "../services/StudentsServices";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import { LoginDto } from "../dto/studentDTO";
import generateToken from "../utils/generateToken";
import "reflect-metadata"

@Service()
class StudentsControllers{
    constructor(private readonly studentsServices = Container.get(StudentServices)){

    }

    async signUp(req: Request, res: Response){
        try{
            const data = req.body;
            let result: ResponseInterface = await this.studentsServices.signUp(data);
            resolve(result.message, result.payload, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
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
            reject(err.message, err.status, res)
        }
    }

    async getStudentByEmail(req: Request, res: Response, next: NextFunction){
        try{
            let {email} = req.params;
            let result = await this.studentsServices.getStudentByEmail(email)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, err.status, res)
        }
    }
}

interface ResponseInterface{
    message: string,
    payload?: any,
    status?: number
}

Container.set(StudentsControllers, new StudentsControllers(new StudentServices()))

export default StudentsControllers