import { Service } from "typedi";
import Classes from "../models/classes.model";
import "reflect-metadata"

@Service()
export class ClassServices{
    constructor(private readonly classes = Classes){
    }

    async save(data: object){
        let result = await new this.classes(data).save()
        return result
    }

    async getById(_id: string){
        let result = await this.classes.findById(_id)
        return result
    }

    async update(id: string, data: any){
        let result = await this.classes.findByIdAndUpdate(id, data, {new: true});
        return result
    }

    async delete(id: string){
        let result = await this.classes.findByIdAndDelete(id)
        return result
    }

    async getAll(){
        let result = await this.classes.find()
        return result
    }
}