import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const jwtSecret: string = String(process.env.JWT_SECRET);
const verifyAuth = (req: any, res: Response, next: NextFunction)=>{
    const {authorization} = req.headers;
    const token = authorization.replace("Bearer ", "")
    if (!token){
        return res.status(403).json({message: 'Unauthorized'})
    }
    try{
        req.user = jwt.verify(token, jwtSecret)
        next()
    }
    catch(err: any){
        return res.status(401).json({message: "Unauthorized Token", error: err.message})
    }
}

export default verifyAuth