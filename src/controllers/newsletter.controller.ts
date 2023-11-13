import { Service } from "typedi";
import "reflect-metadata"
import { NextFunction, Request, Response } from "express";
import { NewsletterService } from "../services/newsletter.service";

@Service()
export class NewsLetterController {
    constructor(
        private readonly newsletterServices: NewsletterService,

    ) { }

    subscribeToNewsletter = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        const newsletter = await this.newsletterServices.save({ email })

        res.send({ message: "Subscribed to newsletter", payload: newsletter })

    }

    getAll = async (req: Request, res: Response, next: NextFunction) => { 
        res.send({ message: "Successful", payload: await this.newsletterServices.getAll() })
    }

}