import { Service } from "typedi";
import { comparePassword, encodePassword } from "../config/bcrypt";
import { LoginDto, StudentDto } from "../dto/studentDTO";
import Student from "../models/students.model";
import generateToken from "../utils/generateToken";
import { Response } from "express";
import { ProductKeyService } from "./ProductKeyServices";
import { SchoolsServices } from "./SchoolsServices";
import { UploadedStudentServices } from "./UploadedStudentServices";

@Service()
export class StudentServices{
    constructor(
        private readonly student = Student,
        private readonly productKey : ProductKeyService,
        private readonly schoolServices : SchoolsServices,
        private readonly uploadedStudents : UploadedStudentServices
        ){

    }

    async signUp(data: StudentDto){
        //validate data
        data.password = await encodePassword(data.password);
        let status = await this.productKey.validateKey(data.productKey)
        data.school = await this.schoolServices.getSchoolByKey(data.productKey)
        //validate key
        const uploadedData:any = await this.uploadedStudents.getuploadedStudentByEmail(data.email)

        console.log(uploadedData)
        if(uploadedData === null){
            return{
                payload: null,
                message: "You've no access",
                status: 401
            }
        }
        else if(data.productKey != uploadedData.productKey){
            return{
                payload: null,
                message: "Invalid Product Key",
                status: 401
            }
        }

        
        else if(!status){
            return{
                payload: null,
                message: "Invalid Product Key",
                status: 401
            }
        }

        data.dob = uploadedData.dob
        const student = await new this.student(data).save()
        return {
            payload: student,
            message: "Signed Up Successfully",
            status: 201
        }
    }

    async signIn(data: LoginDto, res: Response){
        let student: any = await this.student.findOne({email: data.email})
        if(!student){
            return{
                payload: null,
                status: 404,
                message: "There's no user with this email"
            }
        }
        
        let doMatch = await comparePassword(data.password, student?.password)
        if(!doMatch){
            return {
                payload: null,
                status: 403,
                message: "Incorrect Password"
            }
        }

        let token = generateToken(student._id, student.email, res)
        return {
            payload: {student, token},
            message: "Login Successful",
            status: 200
        }
    }

    async getStudentById(_id: string){
        let student = await this.student.findById(_id)
        return student
    }

    async getStudentByEmail(email: string){
        let student = await this.student.findOne({email})
        return student
    }

    async update(id: string, data: any){
        let student = await this.student.findByIdAndUpdate(id, data, {new: true});
        return student
    }

    async delete(id: string){
        let student = await this.student.findByIdAndDelete(id)
        return student
    }

    async getLeaderBoard(limit: number = 10){
        let students = await this.student.find().limit(limit).sort({gem: 1});
        return students;
    }

    async getStudentsBySchool(schoolId: string){
        let students = await this.student.find({school: schoolId})
        return students
    }

    async getAllStudents(school: any){
        let students = await this.student.find({school})
        return students
    }
}