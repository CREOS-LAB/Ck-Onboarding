import { Service } from "typedi";
import 'reflect-metadata'
import MyVideo from "../models/myVideos.model";

@Service()
export class MyVideoService{
    constructor(private readonly model = MyVideo){}

    async save(data: any){
        let result = await new this.model(data).save()
        return result
    }

    async getById(_id: string){
        let result = await this.model.findById(_id)
        return result
    }

    async update(id: string, data: any){
        let result = await this.model.findByIdAndUpdate(id, data, {new: true});
        return result
    }

    async delete(id: string){
        let result = await this.model.findByIdAndDelete(id)
        return result
    }
}

