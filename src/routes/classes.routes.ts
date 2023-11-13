// classesRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import { ClassController } from '../controllers/classes.controller';
import verifySchoolAuth from '../middlewares/verifySchoolAuth';
 // Adjust the import path

export const classesRouter = Router();
const classController = Container.get(ClassController);

classesRouter.get("/:schoolId", classController.getAll);  // Changed route to avoid conflict with getClassById
classesRouter.get("/by-id/:id", classController.getClassById);  // Changed route to avoid conflict with getAll
classesRouter.delete("/:id", classController.deleteClass);  // Note: Corrected method name to deleteClass
classesRouter.patch("/:id", classController.updateClass);  // Note: Corrected method name to updateClass
classesRouter.post("/", verifySchoolAuth, classController.create);

export default classesRouter;
