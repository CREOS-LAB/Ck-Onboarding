import { Service } from "typedi";
import { NotificationModel, Notification } from "../models/notifications.model";
import { PromiseErrorOrSuccess } from "../response";
import { Try } from "../utils/functional";


@Service()
export class NotificationService {



    async create(notification: Partial<Notification>) {
        const model = await NotificationModel.create(notification);
        return model;
    }



    async getNotificationsByUser({ userId, userType }: Pick<Notification, "userId" | "userType">): PromiseErrorOrSuccess<Notification[]> {
        return Try(async (): Promise<Notification[]> => {
            const notifications = await NotificationModel.find({
                userId: userId, userType
            }, {})
            return notifications
        })

    }

    //Admin Callable
    async getAllNotifications(): PromiseErrorOrSuccess<Notification[]> {
        return Try(async (): Promise<Notification[]> => {
            return await NotificationModel.find({})
        })
    }

}


