import { Service } from "typedi";
import { comparePassword, encodePassword } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";
import { Response } from "express";
import { ProductKeyService } from "./productkey.service";
import { SchoolsServices } from "./school.service";
import { TeacherModel } from "../models/teachers.model";
import EmailService from "./email.service";
import { generatePassword } from "../utils/generatePassword";
import { upload } from "../utils/cloudinary";

@Service()
export class TeacherServices {
    constructor(
        private readonly teacher = TeacherModel,
        private readonly productKey: ProductKeyService,
        private readonly schoolServices: SchoolsServices,
        private readonly emailService: EmailService
    ) {

    }

    async getAll() {
        let result = await this.teacher.find()
        return result;
    }

    async getAllBySchool(school: any) {
        let result = await this.teacher.find({ school: school._id })
        return result;
    }

    async getAllInSchoolCount(schoolId: string) {
        let result = await this.teacher.count({ school: schoolId })
        return result;
    }

    async signUp(data: any) {
        data.password = generatePassword()
        this.emailService.sendTeacherSignUpDetails(data.email, data.password, data.school.schoolName)
        data.password = await encodePassword(data.password);
        const teacher = await new this.teacher(data).save()
        return {
            payload: teacher,
            message: "Signed Up Successfully",
            status: 201
        }
    }

    async signIn(data: any, res: Response) {
        let teacher: any = await this.teacher.findOne({ email: data.email })
        if (!teacher) {
            return {
                payload: null,
                status: 404,
                message: "There's no user with this email"
            }
        }

        let doMatch = await comparePassword(data.password, teacher?.password)
        if (!doMatch) {
            return {
                payload: null,
                status: 403,
                message: "Incorrect Password"
            }
        }

        let token = generateToken(teacher._id, teacher.email, res)
        return {
            payload: { teacher, token },
            message: "Login Successful",
            status: 200
        }
    }

    async getteacherById(_id: string) {
        let teacher = await this.teacher.findById(_id)
        return teacher
    }

    async getteacherByEmail(email: string) {
        let teacher = await this.teacher.findOne({ email })
        return teacher
    }

    async update(id: string, data: any) {
        if (data.profilePicture) {
            data.profilePicture = await upload(data.profilePicture.base64)
        }

        let teacher = await this.teacher.findByIdAndUpdate(id, data, { new: true });
        return teacher
    }

    async delete(id: string) {
        let teacher = await this.teacher.findByIdAndDelete(id)
        return teacher
    }

    async getLeaderBoard(limit: number = 10) {
        let teachers = await this.teacher.find().limit(limit).sort({ gem: 1 });
        return teachers;
    }

    async search(name: string) {
        const substring = name; // Replace with the substring you're searching for
        const searchPattern = new RegExp('^' + substring, 'i');

        const result = await this.teacher.find({ firstName: { $regex: searchPattern } })
        return result
    }
}