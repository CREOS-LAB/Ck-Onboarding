import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


const acceptableNextAuth: string = process.env.NEXT_APP_SECRET!

const verifyNextApp = async (req: any, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;
    let token = req.cookies.token || authorization?.replace("Bearer ", "")

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized' })
    }

    try {
        if (token == acceptableNextAuth) {
            return next()
        }

        throw new Error("Unauthorized Token")
    }
    catch (err: any) {
        return res.status(401).json({ message: "Unauthorized Token", error: err.message })
    }
}

export default verifyNextApp