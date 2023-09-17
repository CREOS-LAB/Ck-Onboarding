import { Service } from "typedi";
import Collections from "../models/collections.model";
import "reflect-metadata"

@Service()
export class CollectionServices{
    constructor(private readonly collection = Collections){
    }

    async save(data: any){
        // Define a regular expression to match numbers
        const regex = /(\d+)\s*-\s*(\d+)/;

        // Use regex to extract the numbers
        const match = data.ageRange.match(regex);

        data.minAge = parseInt(match[1]);
        data.maxAge = parseInt(match[2]);
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