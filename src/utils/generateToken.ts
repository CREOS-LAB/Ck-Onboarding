import { Response } from "express";
import jwt from "jsonwebtoken"

const jwtSecret: string = String(process.env.JWT_SECRET);


const generateToken = (_id: string, email: string)=>{
    const token = jwt.sign({_id, email}, jwtSecret)
    // response.cookie("jwt", token, {
    //     httpOnly: true,
    //     maxAge: 24 * 60 * 60 * 10000,
    //     domain: ".vercel.app",
    //     path:"/"
    // })
    return token
}

export default generateToken