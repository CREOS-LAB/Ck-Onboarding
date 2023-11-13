// adminRouter.ts
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AdminController } from '../controllers/admin.controller';
import TeachersController from '../controllers/teacher.controllers';
import { SchoolsController } from '../controllers/schools.controller';
// Adjust the import path

export const adminRouter = Router();
const adminController = Container.get(AdminController);
const schoolController = Container.get(SchoolsController);
const teachersController = Container.get(TeachersController);


adminRouter.post("/sign-up", adminController.signUp);
adminRouter.post("/sign-in", adminController.signIn);
adminRouter.get("/schools/all", schoolController.getAll);
adminRouter.get("/get-teachers", teachersController.getAll);
adminRouter.get("/details", adminController.getDetails);
adminRouter.get("/students/:schoolId", adminController.getStudentsBySchool);
adminRouter.get("/teachers/:schoolId", adminController.getTeachersBySchool);

export default adminRouter;
