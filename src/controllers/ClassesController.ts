import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { ClassServices } from "../services/ClassesServices";


@Service()
export class ClassController{
    constructor(private readonly classServices : ClassServices)
    {}

    async create(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.classServices.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            let result = await this.classServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getClassById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.classServices.getById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }


    async updateclass(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const {password, ...data} = req.body;
            let result = await this.classServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteclass(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.classServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}