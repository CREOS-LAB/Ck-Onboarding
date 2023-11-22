import { Service } from "typedi";
import { AdminService } from "../services/admin.service";
import "reflect-metadata"
import { NextFunction, Request, Response } from "express";
import { ResponseInterface } from "./students.controller";
import { reject, resolve } from "../utils/reponseService";
import { TeacherServices } from "../services/teacher.service";
import { StudentServices } from "../services/student.service";
import { VideosServices } from "../services/video.service";
import { SchoolsServices } from "../services/school.service";

@Service()
export class AdminController {
    constructor(
        private readonly adminServices: AdminService,
        private readonly teachersServices: TeacherServices,
        private readonly studentServices: StudentServices,
        private readonly videoServices: VideosServices,
        private readonly schoolServices: SchoolsServices
    ) { }


    async signUp(req: Request, res: Response) {
        try {
            const data = req.body;
            let result: ResponseInterface = await this.adminServices.signUp(data);
            resolve(result.message, result.payload, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const data = req.body;
            let result: ResponseInterface = await this.adminServices.signIn(data, res);
            resolve(result.message, result.payload, result.status, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    async getSchoolById(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params;
            let result = await this.adminServices.getAdminById(id)
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    async getDetails(req: Request, res: Response, next: NextFunction) {
        try {
            let result;
            let schools: any = await this.schoolServices.getAll()
            let students: any = await this.studentServices.getAllStudents(null)
            let teachers: any = await this.teachersServices.getAll();
            let courses: any = await this.videoServices.getAll();

            result = {
                schools: schools.length,
                students: students.length,
                teachers: teachers.length,
                courses: courses.length
            }

            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    async getStudentsBySchool(req: Request, res: Response) {
        try {
            const { schoolId } = req.params;
            let result = await this.studentServices.getAllStudents(schoolId)
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    async getTeachersBySchool(req: Request, res: Response) {
        try {
            const { schoolId } = req.params;
            let result = await this.teachersServices.getAllBySchool(schoolId)
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }
}