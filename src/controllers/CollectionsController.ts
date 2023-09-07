import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { CollectionServices } from "../services/CollectionServices";


@Service()
export class CollectionsController{
    constructor(private readonly collectionServices : CollectionServices)
    {}

    async create(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.collectionServices.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            let result = await this.collectionServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getCollectionById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.collectionServices.getById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getCollectionByClass(req: Request, res: Response, next: NextFunction){
        try{
            let {classId} = req.params;
            let result = await this.collectionServices.getCollectionByClass(classId);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async updateCollection(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const {password, ...data} = req.body;
            let result = await this.collectionServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteCollection(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.collectionServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}