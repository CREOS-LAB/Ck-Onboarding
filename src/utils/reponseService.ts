import { Response } from "express";

export const resolve = (message: string, payload: Object | Array<Object> | null , status : number, response: Response)=>{
    return response.status(status || 200).json({
        message,
        payload
    })
}

export const reject = (message: string, status : number, response: Response)=>{
    return response.status(status).json({
        message,
        payload: null
    })
}