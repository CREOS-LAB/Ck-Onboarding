// teachersRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import TeachersController from '../controllers/teacher.controllers';
import verifyTeacherOrSchoolAuth from '../middlewares/verfyTeacherOrSchool';
import verifyAuth from '../middlewares/verifyAuth';
import verifySchoolAuth from '../middlewares/verifySchoolAuth';
 // Adjust the import path

export const teachersRouter = Router();
const teachersController = Container.get(TeachersController);

teachersRouter.get("/", verifyAuth, teachersController.getLoggedInTeacher);
teachersRouter.post("/sign-up", verifySchoolAuth, teachersController.signUp);
teachersRouter.post("/sign-in", teachersController.signIn);
teachersRouter.get("/:id", teachersController.getTeacherById);
teachersRouter.get("/all-by-school", verifySchoolAuth, teachersController.getAllBySchool);
teachersRouter.get("/all-by-admin", teachersController.getAll);
teachersRouter.delete("/:id", verifyTeacherOrSchoolAuth, teachersController.deleteTeacher);

// password related
teachersRouter.post("/forgot-password", teachersController.forgotPassword);
teachersRouter.post("/reset-password", teachersController.resetPassword);

export default teachersRouter;
