import { NextFunction, Response } from "express";
import { MessageServices } from "../services/MessageServices";
import { reject, resolve } from "../utils/reponseService";
import { Service } from "typedi";
import "reflect-metadata"

@Service()
export class MessagesController{
    constructor(
        private readonly services : MessageServices
    ){

    }

    async getAllMessagesByConversation(req: any, res: Response, next: NextFunction)
    {
        try{
            const {conversationId} = req.params;
            let result = await this.services.getByConversation(conversationId);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async sendMessage(req: any, res: Response, next: NextFunction)
    {
        try{
            const data = req.body
            data.sentBy = req.user;
            let result = await this.services.save(data);
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}