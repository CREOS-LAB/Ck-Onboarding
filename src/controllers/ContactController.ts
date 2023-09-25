import { Service } from "typedi";
import { ContactServices } from "../services/ContactServices";
import "reflect-metadata";
import { Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";

@Service()
export class ContactController{
    constructor(
        private readonly contactServices: ContactServices
    ){}

    async sendMessage(req: Request, res: Response){
        try{
            const data = req.body;
            const result =await this.contactServices.sendMessage(data)
            resolve("Sent", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getAllMessages(req: Request, res: Response){
        try{
            const result = await this.contactServices.getAllMessages()
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}