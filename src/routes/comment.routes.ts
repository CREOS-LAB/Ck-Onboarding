// commentsRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import { CommentsController } from '../controllers/comment.controller';
 // Adjust the import path

export const commentsRouter = Router();
const commentsController = Container.get(CommentsController);

commentsRouter.get("/", commentsController.getAll);
commentsRouter.get("/:id", commentsController.getCommentById);
commentsRouter.delete("/delete/:id", commentsController.deleteComment);
commentsRouter.patch("/:id", commentsController.updateComment);
commentsRouter.get("/by-video/:videoId", commentsController.getCommentsByVideo);  // Changed route to avoid conflict with getCommentById
commentsRouter.post("/", commentsController.create);

export default commentsRouter;
