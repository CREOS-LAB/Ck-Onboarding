import { Service } from "typedi";
import "reflect-metadata"
import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dto/studentDTO";
import { ResponseInterface } from "./StudentsControllers";
import { reject, resolve } from "../utils/reponseService";
import { NewsletterService } from "../services/NewsletterService";

@Service()
export class NewsLetterController {
    constructor(
        private readonly newsletterServices: NewsletterService,

    ) { }

    async subscribeToNewsletter(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body
        const newsletter = await this.newsletterServices.save({ email })

        res.send({ message: "Subscribed to newsletter", payload: newsletter })

    }

}