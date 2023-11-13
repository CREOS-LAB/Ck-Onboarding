import { Service } from "typedi";
import { CollectionModel } from "../models/collections.model";
import "reflect-metadata"

@Service()
export class CollectionServices {
    constructor(private readonly collection = CollectionModel) {
    }

    save = async (data: any) => {
        // Define a regular expression to match numbers
        const regex = /(\d+)\s*-\s*(\d+)/;

        // Use regex to extract the numbers
        const match = data.ageRange.match(regex);

        data.minAge = parseInt(match[1]);
        data.maxAge = parseInt(match[2]);
        let result = await new this.collection(data).save()
        return result
    }

    getById = async (_id: string) => {
        let result = await this.collection.findById(_id)
        return result
    }

    getCollectionByClass = async (classId: string) => {
        let result = await this.collection.find({ class: classId })
        return result
    }

    update = async (id: string, data: any) => {
        let result = await this.collection.findByIdAndUpdate(id, data, { new: true });
        return result
    }

    delete = async (id: string) => {
        let result = await this.collection.findByIdAndDelete(id)
        return result
    }

    getAll = async () => {
        let result = await this.collection.find()
        return result
    }
}