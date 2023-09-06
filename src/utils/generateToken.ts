import { Response } from "express";
import jwt from "jsonwebtoken"

const jwtSecret: string = String(process.env.JWT_SECRET);
const isProd = Boolean(process.env.NODE_ENV)

const generateToken = (_id: string, email: string, response: Response)=>{
    const token = jwt.sign({_id, email}, jwtSecret)
    response.cookie("token", token, {
        sameSite: isProd ? "none" : "strict",
        secure: isProd,
        maxAge: 24 * 60 * 60 * 1000,
        // domain: isProd ? ".vercel.app" : undefined,
        httpOnly: false,
    })
    console.log(token)
    return token
}

export default generateToken