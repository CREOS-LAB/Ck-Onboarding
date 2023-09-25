import { Service } from "typedi";
import "reflect-metadata"
import { SchoolsServices } from "../services/SchoolsServices";
import { ResponseInterface } from "./StudentsControllers";
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dto/studentDTO";
import generateToken from "../utils/generateToken";
import { ProductKeyService } from "../services/ProductKeyServices";

@Service()
export class SchoolsController{
    constructor(
        private readonly schoolServices : SchoolsServices,
        private readonly productKey: ProductKeyService
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
            if(result.payload){
                generateToken(result.payload._id, result.payload.email, res)
            }
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
}