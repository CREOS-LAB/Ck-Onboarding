//@ts-nocheck
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthUser } from "../passport/types";
import { HttpStatusCode } from "axios";
import { SchoolModel } from "../models/schools.model";


const jwtSecret: string = String(process.env.JWT_SECRET);

const verifySchoolAuth = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;
    console.log(req.url)
    let token = req.cookies.auth || authorization?.replace("Bearer ", "")

    console.log(token)

    if (!token) {
        console.log("Entered here")
        return res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized' })
    }

    try {
        const jwtDecodedUser = jwt.verify(token, jwtSecret)
        let { id } = jwtDecodedUser as AuthUser;
        let user = await SchoolModel.findById(id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'School Not Found' })
        }
        req.user = user
        next()
    }
    catch (err: any) {
        return res.status(HttpStatusCode.Unauthorized).json({ message: "Unauthorized Token", error: err.message })
    }
}

export default verifySchoolAuth