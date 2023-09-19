import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { VideosServices } from "../services/VideoServices";
import { uploader } from "../utils/uploader";
import { upload } from "../utils/cloudinary";
import * as xlsx from "xlsx"

@Service()
export class VideosController{
    constructor(private readonly videosServices : VideosServices)
    {}

    async create(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            data.cover = await upload(data.cover.base64)
            let result = await this.videosServices.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            let result = await this.videosServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async queryVideos(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.videosServices.queryVideos(data)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getStudentsVideos(req: any, res: Response, next: NextFunction){
        try{
            let student = req.user;
            let query = {
                minAge: { $gte : student.age },
                maxAge: { $lte : student.age},
            }
            
            let result = await this.videosServices.queryVideos(query)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getVideoById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.videosServices.getById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getVideosByCollection(req: Request, res: Response, next: NextFunction){
        try{
            let {collectionId} = req.params;
            let result = await this.videosServices.getvideosByCollection(collectionId);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async updateVideo(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const {password, ...data} = req.body;
            let result = await this.videosServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteVideo(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.videosServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async bulkUpload(req: any, res: Response, next: NextFunction){
        try{

            // Assuming you receive the Base64 data as a string from the client
            let school = req.user
            let filePath = req.file.path

            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.Sheets[workbook.SheetNames[0]] // Assuming you have a single sheet
                
            // // console.log(sheetName)
            const data = xlsx.utils.sheet_to_json(sheetName);

            data.forEach((video: any)=>{
               this.videosServices.save(video) 
            })
            let result = {
                message: "Uploaded Successfully",
                payload: null,
                status: 200
            }
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}