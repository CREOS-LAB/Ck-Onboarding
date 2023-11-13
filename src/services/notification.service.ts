import { Service } from "typedi";
import { NotificationModel, Notification } from "../models/notifications.model";


@Service()
export class NotificationService {
    constructor(private model = NotificationModel,
        
    ) { }

    async create(notification: Partial<Notification>) {
        const model = await this.model.create(notification);
        return model;
    }

    async getNotificationsByUser(userData: Pick<Notification, "userId" | "userType">): Promise<Array<Notification>> {
        const { userId, userType } = userData
        const notifications: Array<Notification> = await
            this.model.where({
                userId, userType
            })

        return notifications;
    }

}

