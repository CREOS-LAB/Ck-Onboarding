import { Service } from "typedi";
import { ClassModel } from "../models/classes.model";
import "reflect-metadata"

@Service()
export class ClassServices {
    constructor(private readonly classes = ClassModel) {
    }

    save = async (data: object) => {
        let result = await new this.classes(data).save()
        return result
    }

    getById = async (_id: string) => {
        let result = await this.classes.findById(_id)
        return result
    }

    update = async (id: string, data: any) => {
        let result = await this.classes.findByIdAndUpdate(id, data, { new: true });
        return result
    }

    delete = async (id: string) => {
        let result = await this.classes.findByIdAndDelete(id)
        return result
    }

    getAll = async (schoolId: string) => {
        let result = await this.classes.find({ school: schoolId })
        return result
    }
}