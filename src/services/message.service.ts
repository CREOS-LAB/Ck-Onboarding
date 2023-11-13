import { Service } from "typedi";
import "reflect-metadata"
import Messages from "../models/messages.model";

@Service()
export class MessageServices{
    constructor(
        private readonly model = Messages
    ){}

    async getByConversation(conversation: string){
        let result = await this.model.find({conversation})
        return result
    }

    async save(data: any){
        let result = await new this.model(data).save();
        return result
    }
}