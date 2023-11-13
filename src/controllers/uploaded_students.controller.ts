import { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import "reflect-metadata"
import { UploadedStudentServices } from "../services/uplodaded_students.service";
import * as xlsx from "xlsx"
import EmailService from "../services/email.service";


@Service()
class UploadedStudentControllers {
    constructor(private readonly uploadedStudentServices: UploadedStudentServices,
        private readonly emailService: EmailService
    ) {

    }

    uploadStudents = async (req: any, res: Response, next: NextFunction) => {
        try {

            // Assuming you receive the Base64 data as a string from the client
            let school = req.user
            let filePath = req.file.path

            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.Sheets[workbook.SheetNames[0]] // Assuming you have a single sheet

            // // console.log(sheetName)
            const data = xlsx.utils.sheet_to_json(sheetName);

            data.forEach((student: any) => {
                student.productKey = school.productKey
                this.uploadedStudentServices.uploadStudent(student)
                this.emailService.sendInviteToStudent(student.email, String(school.productKey), school.schoolName)
            })
            let result = {
                message: "Uploaded Successfully",
                payload: null,
                status: 200
            }
            resolve(result.message, result.payload, result.status, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }

    getStudentByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { email } = req.params;
            let result = await this.uploadedStudentServices.getuploadedStudentByEmail(email)
            resolve("Successful", result, 200, res)
        }
        catch (err: any) {
            reject(err.message, 400, res)
        }
    }
}

export interface ResponseInterface {
    message: string,
    payload?: any,
    token?: string,
    status: number
}


export default UploadedStudentControllers