import { Service } from "typedi";
import Admin from "../models/admin.model";
import 'reflect-metadata'
import { comparePassword, encodePassword } from "../config/bcrypt";
import { LoginDto } from "../dto/studentDTO";
import generateToken from "../utils/generateToken";
import { Response } from "express";
import { upload } from "../utils/cloudinary";

@Service()
export class AdminService{
    constructor(private readonly model = Admin){}

    async signUp(data: any){
        //validate data
        let password: string = data.password;
        data.password = await encodePassword(data.password);
        const admin = await new this.model(data).save()

        return {
            payload: admin,
            message: "Signed Up Successfully",
            status: 201
        }
    }

    async signIn(data: LoginDto, res: Response){
        let admin: any = await this.model.findOne({email: data.email})
        if(!admin){
            return{
                payload: null,
                status: 404,
                message: "There's no admin with this email"
            }
        }
        
        let doMatch = await comparePassword(data.password, admin?.password)
        if(!doMatch){
            return {
                payload: null,
                status: 403,
                message: "Incorrect Password"
            }
        }

        let token = generateToken(admin._id, admin.email, res)
        return {
            payload: {admin, token},
            message: "Login Successful",
            status: 200
        }
    }

    async getAdminById(_id: string){
        let admin = await this.model.findById(_id)
        return admin
    }

    async update(id: string, data: any){
        if(data.profilePicture){
            data.profilePicture = await upload(data.profilePicture.base64)
        }

        let school = await this.model.findByIdAndUpdate(id, data, {new: true});
        return school
    }

    async delete(id: string){
        let school = await this.model.findByIdAndDelete(id)
        return school
    }
}

