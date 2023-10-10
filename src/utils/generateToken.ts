import { Response } from "express";
import jwt from "jsonwebtoken"

const jwtSecret: string = String(process.env.JWT_SECRET);
const isProd = Boolean(process.env.NODE_ENV)

const generateToken = (_id: string, email: string, response: Response)=>{
    const token = jwt.sign({_id, email}, jwtSecret)
    response.cookie("token", token, {
        sameSite: isProd ? "none" : "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 * 30,
        // domain: isProd ? ".vercel.app" : undefined,
        httpOnly: false,
    })
    return token
}

export const generateTokenForForgotPassword = (_id: string)=>{
    const token = jwt.sign({_id}, jwtSecret, {expiresIn: "1h"});
    return token;
}

export default generateToken