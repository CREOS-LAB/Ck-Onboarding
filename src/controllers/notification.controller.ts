import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

import { NotificationService } from "../services/notification.service";
import { SendResponseOrError, SuccessOrErrorHandler } from "../response";

@Service()
export class NotificationController {
    constructor(private service: NotificationService) { }
    
    getNotificationsOfUser = SuccessOrErrorHandler((req)=> {
        return this.service.getNotificationsByUser({userId: "1", userType: '2'})
    })

    getAllNotifications = SuccessOrErrorHandler((req ) => {
        return this.service.getAllNotifications()
    })
}