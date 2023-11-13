// studentsRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import StudentsControllers from '../controllers/students.controller';
import verifyAuth from '../middlewares/verifyAuth';
import verifyTeacherOrSchoolAuth from '../middlewares/verfyTeacherOrSchool';
import verifySchoolAuth from '../middlewares/verifySchoolAuth';

export const studentsRouter = Router();


const studentsController = Container.get(StudentsControllers);



studentsRouter.get("/", verifyAuth, studentsController.getLoggedInStudent);
studentsRouter.get("/all", studentsController.getAll);
studentsRouter.get("/leadership", studentsController.leaderBoard);
studentsRouter.post("/sign-up", studentsController.signUp);
studentsRouter.post("/sign-in", studentsController.signIn);
studentsRouter.get("/:id", studentsController.getStudentById);
studentsRouter.get("/email/:email", studentsController.getStudentByEmail);
studentsRouter.post("/logout", studentsController.logout);
studentsRouter.patch("/update", verifyAuth, studentsController.updateStudent);
studentsRouter.delete("/:id", verifyTeacherOrSchoolAuth, studentsController.deleteStudent);

// password related
studentsRouter.post("/forgot-password", studentsController.forgotPassword);
studentsRouter.post("/reset-password", studentsController.resetPassword);

export default studentsRouter;

