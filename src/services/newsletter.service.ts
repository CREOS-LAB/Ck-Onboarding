import { Service } from "typedi";
import Badges from "../models/badge.model"
import Newsletters from "../models/newsletter.model";

@Service()
export class NewsletterService {
    constructor(private readonly model = Newsletters){
    }

    async save(data: any){
        let result = await new this.model(data).save()
        return result;
    }

    async getAll(){
        let result = await this.model.find();
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