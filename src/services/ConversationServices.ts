import { Service } from "typedi";
import Conversations from "../models/conversations.model";
import "reflect-metadata"
import {} from "mongoose"

@Service()
export class ConversationServices{
    constructor(
        private readonly model = Conversations
    ){}

    async save(data: any){
        let result = await new this.model(data).save();
        return result
    }

    async getAllByUser(sentBy: any){
        let result = await this.model.find({members: { $in: [sentBy] }})
        return result
    }
}