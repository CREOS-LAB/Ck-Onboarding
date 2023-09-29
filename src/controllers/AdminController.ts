import { Service } from "typedi";
import { AdminService } from "../services/AdminServices";
import "reflect-metadata"
import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dto/studentDTO";
import { ResponseInterface } from "./StudentsControllers";
import { reject, resolve } from "../utils/reponseService";
import generateToken from "../utils/generateToken";

@Service()
export class AdminController{
    constructor(
        private readonly adminServices : AdminService
    ){}

    async signUp(req: Request, res: Response){
        try{
            const data = req.body;
            let result: ResponseInterface = await this.adminServices.signUp(data);
            resolve(result.message, result.payload, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async signIn(req: Request, res: Response){
        try{
            const data: LoginDto = req.body;
            let result: ResponseInterface = await this.adminServices.signIn(data, res);
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getSchoolById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.adminServices.getAdminById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}