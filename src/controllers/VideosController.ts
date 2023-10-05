import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { VideosServices } from "../services/VideoServices";
import { uploader } from "../utils/uploader";
import { upload } from "../utils/cloudinary";
import * as xlsx from "xlsx"
import { StudentServices } from "../services/StudentsServices";

@Service()
export class VideosController{
    constructor(private readonly videosServices : VideosServices,
            private readonly studentServices: StudentServices
        )
    {}

    async create(req: any, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let {teacher, school} = req.query

            if(teacher){
                data.createdByTeacher = req.user
            }
            else{
                data.createdBySchool = req.user
            }

            if(data.cover){
                data.cover = await upload(data.cover?.base64)
            }
            
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
            const {id} = req.params;
            const {password, ...data} = req.body;
            let result = await this.videosServices.update(id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteVideo(req: any, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            let result = await this.videosServices.delete(id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async bulkUpload(req: any, res: Response, next: NextFunction){
        try{
            const data: any = req.body
            let {teacher, school} = req.query

            if(teacher){
                data.createdByTeacher = req.user
            }
            else{
                data.createdBySchool = req.user
            }

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

    async bulkUpload2(req:any, res: Response, next: NextFunction){
        try{

            // Assuming you receive the Base64 data as a string from the client


            let filePath = req.file.path
            let {teacher, school} = req.query
            

            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.Sheets[workbook.SheetNames[0]] // Assuming you have a single sheet

            // // console.log(sheetName)
            const data = xlsx.utils.sheet_to_json(sheetName);

            data.forEach((video: any)=>{
                if(teacher){
                    video.createdByTeacher = req.user
                }
                else{
                    video.createdBySchool = req.user
                }
                console.log(video)
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

    async watchVideo(req: any, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            const student = req.user;
            let video = await this.videosServices.getById(id)
            let index = video?.watched.indexOf(student._id)

            if(index === -1){
                video?.watched.push(student._id)
            }
            
            const response = await this.videosServices.update(id, video);
            resolve("Successful", response, 200, res)
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
            let index = video?.watched.indexOf(student._id)

            if(index === -1){
                video?.watched.push(student._id)
            }

            console.log(video?.views)

            const response = await this.videosServices.update(id, video);
            resolve("Successful", response, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async completeVideo(req: any, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            const student = req.user;
            let video = await this.videosServices.getById(id)
            let index = video?.completed.indexOf(student._id)
            let response = null
            if(index === -1){
                video?.completed.push(student._id)
                student.gem += 2;
                student.completedCourses += 1
                this.videosServices.update(id, video);
                response = await this.studentServices.update(student._id, student)
            }
            resolve("Successful", response, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }


    async searchVideos(req: any, res: Response, next: NextFunction){
        try{
            const {name} = req.query;
            let result = await this.videosServices.searchVideos(name);
            resolve("Successful", result, 200, res)
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