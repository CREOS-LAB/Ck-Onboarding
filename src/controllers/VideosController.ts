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

    async bulkUpload(req: Request, res: Response, next: NextFunction){
        try{
            const data: VideoToUpload = req.body

            let videos: String[] = data.videos.split(/,|,\s*|\s+/);
            videos = videos.filter(url => url.trim() !== '');
            
            videos.forEach((video: any)=>{
                let item: any = {};
                item.link = video
                item.ageRange = data.ageRange
                item.category = data.category
                console.log(video)
                this.videosServices.save(item) 
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

    async watchVideo(req: any, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            const student = req.user;
            let video = await this.videosServices.getById(id)
            let index = video?.watched.indexOf(student._id)

            if(index === -1){
                video?.watched.push(student._id)
            }
            
            this.videosServices.update(id, video);
            resolve("Successful", null, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async viewVideo(req: any, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            const student = req.user;
            let video = await this.videosServices.getById(id)
            video?.views.push(student)

            this.videosServices.update(id, video);
            resolve("Successful", null, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}

interface VideoToUpload{
    videos: String,
    ageRange: String,
    category: String
}