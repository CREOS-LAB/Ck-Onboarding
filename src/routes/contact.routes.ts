import { Router } from "express";
import Container from "typedi";
import { ContactController } from "../controllers/contact.controller";
import { useValidateAndSanitize } from "../middlewares/useValidateAndSanitize";
import { CreateContactDTO } from "../dtos/contact.dto";

export const contactRouter = Router()
const contactController = Container.get(ContactController);

contactRouter.get("/contact", contactController.getAllMessages)
contactRouter.post("/contact/send-message", useValidateAndSanitize(CreateContactDTO), contactController.sendMessage)


