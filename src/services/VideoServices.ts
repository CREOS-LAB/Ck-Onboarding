import { Service } from "typedi";
import "reflect-metadata"
import Videos from "../models/videos.model";
import { returnDescription } from "../utils/description-generator";

@Service()
export class VideosServices{
    constructor(private readonly videos = Videos){
    }

    async save(data: any){
        // Define a regular expression to match numbers
        const regex = /(\d+)\s*-\s*(\d+)/;
        console.log(data)
        
        if(data.ageRange){
            const match = data.ageRange.match(regex);

       if (match) {
           // match[1] contains the first number, and match[2] contains the last number
           data.minAge = parseInt(match[1]);
           data.maxAge = parseInt(match[2]);

       } else {
           console.log("No valid range found in the input string.");
       }
       }
       
        data.description = await returnDescription(data.link)
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

    async queryVideos( data: any){
        // Define a regular expression to match numbers
        const regex = /(\d+)\s*-\s*(\d+)/;

        // Use regex to extract the numbers
        console.log(data)

        if(data.ageRange){
             const match = data.ageRange.match(regex);

        if (match) {
            // match[1] contains the first number, and match[2] contains the last number
            data.minAge = parseInt(match[1]);
            data.maxAge = parseInt(match[2]);
            data.ageRange = null

            } else {
                console.log("No valid range found in the input string.");
            }
        }
       

        let totalQuery = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value != null)
          );

          console.log(totalQuery)
        
        let result = await this.videos.find(totalQuery).exec()
        return result
    }

    async searchVideos(name: string){
        const substring = name; // Replace with the substring you're searching for
        const searchPattern = new RegExp('^' + substring, 'i');

        const result = await this.videos.find({ name: { $regex: searchPattern}})
        return result
    }
}