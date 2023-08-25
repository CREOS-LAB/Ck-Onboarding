import { Service } from "typedi";
import School from "../models/schools.model";
import { comparePassword, encodePassword } from "../config/bcrypt";
import { LoginDto } from "../dto/studentDTO";
import "reflect-metadata"

@Service()
export class SchoolsServices{
    constructor(
        private readonly model = School
    ){}

    async signUp(data: any){
        //validate data
        data.password = await encodePassword(data.password);
        const school = await new this.model(data).save()
        return {
            payload: school,
            message: "Created Successfully",
            status: 201
        }
    }

    async signIn(data: LoginDto){
        let school: any = await this.model.findOne({email: data.email})
        if(!school){
            return{
                payload: null,
                status: 404,
                message: "There's no School with this email"
            }
        }
        
        let doMatch = await comparePassword(data.password, school?.password)
        if(!doMatch){
            return {
                payload: null,
                status: 403,
                message: "Incorrect Password"
            }
        }

        return {
            payload: school,
            message: "Login Successful",
            status: 200
        }
    }

    async getSchoolById(_id: string){
        let school = await this.model.findById(_id)
        return school
    }

    async getSchoolByKey(key: string){
        let school = await this.model.findOne({productKey:key})
        return school
    }

    async getSchoolByEmail(email: string){
        let school = await this.model.findOne({email})
        return school
    }

    async update(id: string, data: any){
        let school = await this.model.findByIdAndUpdate(id, data, {new: true});
        return school
    }

    async delete(id: string){
        let school = await this.model.findByIdAndDelete(id)
        return school
    }
}