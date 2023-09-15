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

@Service()
class teacherControllers{
    constructor(private readonly uploadedStudentServices: UploadedStudentServices){

    }

    async uploadStudents(req: Request, res: Response, next: NextFunction){
        try{

            // Assuming you receive the Base64 data as a string from the client
            const base64Data = '...'; // Replace with the actual Base64 data

            // Create a buffer from the Base64 data
            const binaryData = Buffer.from(base64Data, 'base64');

            // Define a file path and name for the saved Excel file
            const filePath = 'uploads/myExcelFile.xlsx'; // You can change the path and file name as needed

            // Write the binary data to the file
            fs.writeFile(filePath, binaryData, 'binary', (err) => {
            if (err) {
                console.error('Error saving the file:', err);
                // Handle the error appropriately (e.g., send an error response to the client)
            } else {
                console.log('File saved successfully.');
                // Handle the success (e.g., send a success response to the client)
            }
            });

            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; // Assuming you have a single sheet

            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

            data.forEach((item: any) => {
            const newItem = this.uploadedStudentServices.uploadStudent(item)
            });

        }
        catch(err){

        }
    }

    async getTeacherByEmail(req: Request, res: Response, next: NextFunction){
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


export default teacherControllers