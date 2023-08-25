import { Service } from "typedi";
import ProductKey from "../models/productKeys.model";
import "reflect-metadata"

@Service()
export class ProductKeyService{
    constructor( private readonly model = ProductKey){}

    async save(data: any){
        let result = await new this.model(data).save();
        return result
    }

    async generateKey(){
        let length = 12;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        let key = await this.save({key: randomString})
        return key;
    }
}