import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { validate } from "class-validator"
import { NotificationService } from "../services/notification.service";

@Service()
export class NotificationController {
    constructor(private service: NotificationService) { }
    getNotificationsOfUser = async (req: Request, res: Response, next: NextFunction) => {
        const errors = await validate(req.body)

        if (errors) {
            return res.status(400).json({
                errors,
                message: "Error in notifications",
                status: 400,
            })
        }

        const result = this.service.getNotificationsByUser(req.body)

        return res.json({
            message: "Fetched notifications",
            result
        })


    }
}