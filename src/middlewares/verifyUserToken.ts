import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ErrorResponse } from "../response";
import { HttpStatusCode } from "axios";
import { AuthUser } from "../passport/types";
import { JWT_SECRET } from "../config";


export const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
    try {




        const token = req.cookies.auth;
        console.log(token)

        if (!token) {
            next(ErrorResponse({
                message: "You are not logged in",
                status: HttpStatusCode.Unauthorized
            }))
        }

        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                next(ErrorResponse({
                    message: err.message || "You are not logged in",
                    status: HttpStatusCode.Unauthorized
                }))
            }
            console.log(err)
            req.user = decoded as AuthUser;
            next()
        })



    } catch (e: any) {
        console.log(e)
        next(ErrorResponse({
            message: e.message || "You are not logged in",
            status: HttpStatusCode.Unauthorized
        }))
    }
}
