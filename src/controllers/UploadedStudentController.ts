import Container, { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { reject, resolve } from "../utils/reponseService";
import { LoginDto } from "../dto/studentDTO";
import generateToken from "../utils/generateToken";
import "reflect-metadata"
import { UploadedStudentServices } from "../services/UploadedStudentServices";
import { AnyArray } from "mongoose";
import * as xlsx from "xlsx"
import * as fs from "fs"
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import EmailService from "../services/EmailService";


@Service()
class UploadedStudentControllers{
    constructor(private readonly uploadedStudentServices: UploadedStudentServices,
    private readonly emailService: EmailService    
    ){

    }

    async uploadStudents(req: any, res: Response, next: NextFunction){
        try{

            // Assuming you receive the Base64 data as a string from the client
            let school = req.user
            let filePath = req.file.path

            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.Sheets[workbook.SheetNames[0]] // Assuming you have a single sheet
                
            // // console.log(sheetName)
            const data = xlsx.utils.sheet_to_json(sheetName);

            data.forEach((student: any)=>{
                student.productKey = school.productKey
                console.log(school.productKey);
                this.uploadedStudentServices.uploadStudent(student)
                this.emailService.sendInviteToStudent(student.email, String(school.productKey))
            })
            let result = {
                message: "Uploaded Successfully",
                payload: null,
                status: 200
            }
            resolve(result.message, result.payload, result.status, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }

    async getStudentByEmail(req: Request, res: Response, next: NextFunction){
        try{
            let {email} = req.params;
            let result = await this.uploadedStudentServices.getuploadedStudentByEmail(email)
            resolve("Successful", result, 200, res)
        }
        catch(err: any){
            reject(err.message, 400, res)
        }
    }
}

export interface ResponseInterface{
    message: string,
    payload?: any,
    token?: string,
    status: number
}


export default UploadedStudentControllers