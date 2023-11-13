import { Router } from "express";
import Container from "typedi";
import { CourseController } from "../controllers/course.controller"
import { useValidateAndSanitize } from "../middlewares/useValidateAndSanitize";
import { CreateCourseDTO } from "../dtos/course.dto";
import { uploadExcel } from "../multer";



const courseController = Container.get(CourseController)
export const courseRouter = Router()

courseRouter.get("/", courseController.getAllCourses)
courseRouter.post("/", useValidateAndSanitize(CreateCourseDTO), courseController.createCourse)
courseRouter.post("/bulk", uploadExcel.single("file"), courseController.bulkCreateCourse)



export default courseRouter