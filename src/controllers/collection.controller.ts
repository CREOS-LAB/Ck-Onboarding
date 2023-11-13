import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { CollectionServices } from "../services/collection.service";
import { uploader } from "../utils/uploader";
import { upload } from "../utils/cloudinary";


@Service()
export class CollectionsController{
    constructor(private readonly collectionServices : CollectionServices)
    {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let data = req.body;
            data.cover = await upload(data.cover.base64)
            let result = await this.collectionServices.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let result = await this.collectionServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let {id} = req.params;
            let result = await this.collectionServices.getById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    getCollectionByClass = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let {classId} = req.params;
            let result = await this.collectionServices.getCollectionByClass(classId);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    updateCollection = async (req: any, res: Response, next: NextFunction) => {
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

    deleteCollection = async (req: any, res: Response, next: NextFunction) => {
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