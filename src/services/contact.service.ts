import { Service } from "typedi";
import { ContactModel } from "../models/contacts.model";
import "reflect-metadata"
import EmailService from "./email.service";

@Service()
export class ContactServices {
    constructor(
        private readonly model = ContactModel,
        private readonly emailService: EmailService
    ) { }

    async sendMessage(data: any) {
        let result = await new this.model(data).save()
        this.emailService.sendMessageFromWebsiteToAdminMail(data)
        return result;
    }

    async getAllMessages() {
        let result = await this.model.find();
        return result
    }
}


