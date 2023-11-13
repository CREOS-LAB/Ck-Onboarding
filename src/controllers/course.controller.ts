
import { Service } from "typedi"
import { SendResponseOrError } from "../response"
import { NextFunction, Request, Response } from "express"
import { CourseService } from "../services/courses.service"
import { CreateCourseDTO } from "../dtos/course.dto"


@Service()
export class CourseController {
    constructor(private courseService: CourseService) { }
    getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
        
        return SendResponseOrError({
            value: this.courseService.getAllCourses(),
            res, next
        })
    }

    createCourse = async (req: Request, res: Response, next: NextFunction) => {
        return SendResponseOrError({
            value: this.courseService.createCourse(req.body as CreateCourseDTO),
            res, next
        })
    }

    bulkCreateCourse = (req: Request, res: Response, next: NextFunction) => {
        return SendResponseOrError({
            value: this.courseService.bulkCreateCourse(),
            res, next
        })
    }

}