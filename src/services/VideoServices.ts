import { Service } from "typedi";
import "reflect-metadata"
import Videos from "../models/videos.model";

@Service()
export class VideosServices{
    constructor(private readonly videos = Videos){
    }

    async save(data: object){
        let result = await new this.videos(data).save()
        return result
    }

    async getById(_id: string){
        let result = await this.videos.findById(_id)
        return result
    }

    async getvideosByCollection(collectionId: string){
        let result = await this.videos.find({collectionRelation: collectionId})
        return result
    }

    async update(id: string, data: any){
        let result = await this.videos.findByIdAndUpdate(id, data, {new: true});
        return result
    }

    async delete(id: string){
        let result = await this.videos.findByIdAndDelete(id)
        return result
    }

    async getAll(){
        let result = await this.videos.find()
        return result
    }
}