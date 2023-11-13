import { Service } from "typedi";
import "reflect-metadata"
import { reject, resolve } from "../utils/reponseService";
import { NextFunction, Request, Response } from "express";
import { CommentsServices } from "../services/comment.service";


@Service()
export class CommentsController{
    constructor(private readonly commentServices : CommentsServices)
    {}

    async create(req: Request, res: Response, next: NextFunction){
        try{
            let data = req.body;
            let result = await this.commentServices.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            let result = await this.commentServices.getAll();
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getCommentById(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;
            let result = await this.commentServices.getById(id)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getCommentsByVideo(req: Request, res: Response, next: NextFunction){
        try{
            let {videoId} = req.params;
            let result = await this.commentServices.getcommentsByVideo(videoId);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async updateComment(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            const {password, ...data} = req.body;
            let result = await this.commentServices.update(_id, data);
            resolve("Update Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async deleteComment(req: any, res: Response, next: NextFunction){
        try{
            const {_id} = req.user;
            let result = await this.commentServices.delete(_id);
            resolve("Deleted Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}