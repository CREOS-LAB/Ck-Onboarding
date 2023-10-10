import { Service } from "typedi";
import { BadgesServices } from "../services/BadgeService";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";

@Service()
export class BadgeController{
    constructor(private readonly services : BadgesServices){

    }

    async save(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.services.save(data);
            resolve("Successful", result, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.services.getAll();
            resolve("Successful", result, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let {id} = req.params;
            let result = await this.services.update(id, data);
            resolve("Successful", result, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.services.delete(id);
            resolve("Deleted Successfully", result, 200, res);
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async query(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.services.query(data)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.services.getById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}