import { Response } from "express"
import { MyVideoService } from "../services/MyVideoServices";
import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";

@Service()
export class MyVideoController{
    constructor(
        private readonly services : MyVideoService
    ){

    }

    async getAll(req: any, res: Response){
        try{
            let student = req.user;
            let result = await this.services.getByStudent(student, null)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async save(req: any, res: Response){
        try{
            let data = req.body;
            data.student = req.user
            let result = await this.services.save(data)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async update(req: any, res: Response){
        try{
            let data = req.body;
            let {videoId} = req.params
            let student = req.user
            let result = await this.services.update(student, videoId, data)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}