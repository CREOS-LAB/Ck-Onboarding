// schoolsRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import { SchoolsController } from '../controllers/schools.controller';
import verifySchoolAuth from '../middlewares/verifySchoolAuth';
import passport from 'passport';
import { verifyUserToken } from '../middlewares/verifyUserToken';
import { School } from '../models/schools.model';
import { useValidateAndSanitize } from '../middlewares/useValidateAndSanitize';
import { SchoolSignInDTO, SchoolSignUpDTO } from '../dtos/school.dto';


export const schoolsRouter = Router();

const schoolController = Container.get(SchoolsController);

schoolsRouter.get("/", verifyUserToken, schoolController.getLoggedInSchool);
schoolsRouter.post("/sign-up", useValidateAndSanitize(SchoolSignUpDTO), schoolController.signUp);
schoolsRouter.post("/sign-in", useValidateAndSanitize(SchoolSignInDTO), schoolController.signIn);
schoolsRouter.get("/sign-in/google", passport.authenticate("google-school"));
schoolsRouter.get("/sign-in/google/callback", passport.authenticate("google-school"), schoolController.signInGoogle);
schoolsRouter.get("/details", verifyUserToken, schoolController.getSchoolDetails);
schoolsRouter.get("/email/:email", schoolController.getSchoolByEmail);
schoolsRouter.post("/logout", schoolController.logout);

/*TODO change authentictaion type to use verifyUserToken
schoolsRouter.patch("/update", verifySchoolAuth, schoolController.updateSchool);
schoolsRouter.delete("/delete", verifySchoolAuth, schoolController.deleteSchool);
*/
schoolsRouter.get("/:id", schoolController.getSchoolById);

// password related
schoolsRouter.post("/forgot-password", schoolController.forgotPassword);
schoolsRouter.post("/reset-password", schoolController.resetPassword);

export default schoolsRouter;
