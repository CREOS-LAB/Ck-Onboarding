import { Container } from 'typedi';
import { Router } from 'express';
import { NewsLetterController } from '../controllers/newsletter.controller';
export const newsletterRouter = Router();

newsletterRouter.post('/subscribe', Container.get(NewsLetterController).subscribeToNewsletter);
newsletterRouter.get('/all', Container.get(NewsLetterController).getAll);

export default newsletterRouter
