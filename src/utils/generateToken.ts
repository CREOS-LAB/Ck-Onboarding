import { Response } from "express";
import jwt from "jsonwebtoken"
import { randomBytes } from "crypto"
import { AuthUser } from "../passport/types";
import { JWT_SECRET } from "../config";


const isProd = Boolean(process.env.NODE_ENV)

const generateToken = (_id: string, email: string, response: Response) => {
    const token = jwt.sign({ _id, email }, JWT_SECRET)
    response.cookie("token", token, {
        sameSite: isProd ? "none" : "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 * 30,
        httpOnly: false,
    })
    return token
}

export const generateUserToken = (user: AuthUser, res?: Response) => {
    
    const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: "5 days"
    })

    res?.cookie("auth", token, {
        maxAge: 60 * 60 * 60 * 60,
        httpOnly: true,
    })
    return token;
}

export const generateTokenForForgotPassword = (_id: string) => {
    const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
}


export const generateProductkey = (): string => {
    return randomBytes(16).toString('hex');
}

export default generateToken