import { Router } from "express"
import { NotificationController } from "../controllers/notification.controller"
import Container from "typedi"

export const notificationRouter = Router()

const notificationController = Container.get(NotificationController)

notificationRouter.post("/user", notificationController.getNotificationsOfUser)





export default notificationRouter