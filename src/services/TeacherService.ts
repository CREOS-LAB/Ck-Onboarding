import { Service } from "typedi";
import { comparePassword, encodePassword } from "../config/bcrypt";
import generateToken from "../utils/generateToken";
import { Response } from "express";
import { ProductKeyService } from "./ProductKeyServices";
import { SchoolsServices } from "./SchoolsServices";
import Teacher from "../models/teachers.model";
import { LoginDto } from "../dto/studentDTO";
import EmailService from "./EmailService";

@Service()
export class TeacherServices{
    constructor(
        private readonly teacher = Teacher,
        private readonly productKey : ProductKeyService,
        private readonly schoolServices : SchoolsServices,
        private readonly emailService : EmailService
        ){

    }

    async signUp(data: any){
        data.password =""
        this.emailService.sendTeacherSignUpDetails(data.email, data.password)
        data.password = await encodePassword(data.password);
        const teacher = await new this.teacher(data).save()
        return {
            payload: teacher,
            message: "Signed Up Successfully",
            status: 201
        }
    }

    async signIn(data: LoginDto, res: Response){
        let teacher: any = await this.teacher.findOne({email: data.email})
        if(!teacher){
            return{
                payload: null,
                status: 404,
                message: "There's no user with this email"
            }
        }
        
        let doMatch = await comparePassword(data.password, teacher?.password)
        if(!doMatch){
            return {
                payload: null,
                status: 403,
                message: "Incorrect Password"
            }
        }

        let token = generateToken(teacher._id, teacher.email, res)
        return {
            payload: {teacher, token},
            message: "Login Successful",
            status: 200
        }
    }

    async getteacherById(_id: string){
        let teacher = await this.teacher.findById(_id)
        return teacher
    }

    async getteacherByEmail(email: string){
        let teacher = await this.teacher.findOne({email})
        return teacher
    }

    async update(id: string, data: any){
        let teacher = await this.teacher.findByIdAndUpdate(id, data, {new: true});
        return teacher
    }

    async delete(id: string){
        let teacher = await this.teacher.findByIdAndDelete(id)
        return teacher
    }

    async getLeaderBoard(limit: number = 10){
        let teachers = await this.teacher.find().limit(limit).sort({gem: 1});
        return teachers;
    }
}