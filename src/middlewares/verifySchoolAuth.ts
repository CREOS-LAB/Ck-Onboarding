import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Student from "../models/students.model";
import School from "../models/schools.model";

const jwtSecret: string = String(process.env.JWT_SECRET);
const verifySchoolAuth = async (req: any, res: Response, next: NextFunction)=>{
    const {token} = req.cookies
    
    if (!token){
        return res.status(403).json({message: 'Unauthorized'})
    }
    try{
        req.user = jwt.verify(token, jwtSecret)
        let {_id} = req.user;
        let user = await School.findById(_id);
        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }
        req.user = user
        next()
    }
    catch(err: any){
        return res.status(401).json({message: "Unauthorized Token", error: err.message})
    }
}

export default verifySchoolAuth