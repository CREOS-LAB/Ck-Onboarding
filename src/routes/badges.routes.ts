
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { BadgeController } from '../controllers/badge.controller';


export const badgeRouter = Router();
const badgeController = Container.get(BadgeController);

badgeRouter.post("/", badgeController.save);
badgeRouter.get("/all", badgeController.getAll);
badgeRouter.patch("/:id", badgeController.edit);
badgeRouter.delete("/:id", badgeController.delete);
badgeRouter.post("/search", badgeController.query);
badgeRouter.get("/:id", badgeController.getById);

export default badgeRouter;
