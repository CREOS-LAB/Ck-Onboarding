import { NextFunction, Request, Response } from "express";
import { ConversationServices } from "../services/conversation.service";
import { reject, resolve } from "../utils/reponseService";
import "reflect-metadata"
import { Service } from "typedi";

@Service()
export class ConversationsController{
    constructor(
        private readonly services : ConversationServices
    ){

    }

    async getMyConversations(req: any, res: Response, next: NextFunction){
        try{
            const student = req.user;
            let result = await this.services.getAllByUser(student);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async addConversation(req: any, res: Response, next: NextFunction)
    {
        try{
            const student = req.user;
            const {otherStudentId} = req.body;
            let data = {
                members: [student._id, otherStudentId]
            }
            let result = await this.services.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

}