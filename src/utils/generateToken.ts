import { Response } from "express";
import jwt from "jsonwebtoken"

const jwtSecret: string = String(process.env.JWT_SECRET);


const generateToken = (_id: string, email: string, response: Response)=>{
    const token = jwt.sign({_id, email}, jwtSecret)
    response.cookie("token", token, {
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 7,
        domain: ".vercel.app",
        path: "/signin" // Set the path to /signin
    })
    console.log(token)
    return token
}

export default generateToken