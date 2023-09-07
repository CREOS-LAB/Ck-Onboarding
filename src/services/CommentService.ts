import { Service } from "typedi";
import "reflect-metadata"
import Comments from "../models/comments.model";

@Service()
export class CommentsServices{
    constructor(private readonly comments = Comments){
    }
    async save(data: object){
        let result = await new this.comments(data).save()
        return result
    }

    async getById(_id: string){
        let result = await this.comments.findById(_id)
        return result
    }

    async getcommentsByVideo(videoId: string){
        let result = await this.comments.find({video: videoId})
        return result
    }

    async update(id: string, data: any){
        let result = await this.comments.findByIdAndUpdate(id, data, {new: true});
        return result
    }

    async delete(id: string){
        let result = await this.comments.findByIdAndDelete(id)
        return result
    }

    async getAll(){
        let result = await this.comments.find()
        return result
    }
}