import { Service } from "typedi";
import Badges from "../models/badge.model"

@Service()
export class BadgesServices{
    constructor(private readonly model = Badges){
    }

    async save(data: any){
        let result = await new this.model(data).save()
        return result;
    }

    async getAll(){
        let result = await this.model.find();
        return result;
    }

    async getById(id: string){
        let result = await this.model.findById(id)
        return result;
    }

    async delete(id: string){
        let result = await this.model.findByIdAndDelete(id)
        return result;
    }

    async update(id: string, data: any){
        let result = await this.model.findByIdAndUpdate(id, data);
        return result;
    }

    async getByAgeRange(ageRange: number){
        let result = await this.model.find({ageRange});
        return result;
    }

    async query( data: any){
        let totalQuery = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value != null)
        );
        let result = await this.model.find(totalQuery).exec()
        return result
    }
}