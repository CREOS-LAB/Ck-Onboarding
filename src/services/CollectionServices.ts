import { Service } from "typedi";
import Collections from "../models/collections.model";
import "reflect-metadata"

@Service()
export class CollectionServices{
    constructor(private readonly collection = Collections){
    }

    async save(data: object){
        let result = await new this.collection(data).save()
        return result
    }

    async getById(_id: string){
        let result = await this.collection.findById(_id)
        return result
    }

    async getCollectionByClass(classId: string){
        let result = await this.collection.find({class: classId})
        return result
    }

    async update(id: string, data: any){
        let result = await this.collection.findByIdAndUpdate(id, data, {new: true});
        return result
    }

    async delete(id: string){
        let result = await this.collection.findByIdAndDelete(id)
        return result
    }

    async getAll(){
        let result = await this.collection.find()
        return result
    }
}