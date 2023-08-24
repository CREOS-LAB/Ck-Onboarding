import { encodePassword } from "../config/bcrypt";
import { StudentDto } from "../dto/studentDTO";
import Student from "../models/students.model";
import jwt from "jsonwebtoken"

class StudentServices{
    constructor(private readonly student = Student){

    }

    async signUp(data: StudentDto){
        //validate data
        data.password = await encodePassword(data.password);
        
    }
}