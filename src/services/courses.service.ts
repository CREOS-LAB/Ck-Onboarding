import { Service } from "typedi";
import { Course, CourseModel } from "../models/courses.model";
import { ErrorResponse, FutureErrorOrSuccess, SuccessResponse } from "../response";
import * as E from "fp-ts/Either"
import { HttpStatusCode } from "axios";
import { CreateCourseDTO } from "../dtos/course.dto";

//TODO get courses specifically school using authentication data

@Service()
export class CourseService {
    async getAllCourses(limit?: number, page?: number): FutureErrorOrSuccess<Course[]> {
        try {
            return E.right(SuccessResponse({
                result: await CourseModel.find({}, {}, { limit, page }),
                message: "Successfully gotten courses"
            }))
        } catch (e: any) {
            return E.left(ErrorResponse({
                message: e.message || "Error fecthing courses",
                status: HttpStatusCode.InternalServerError
            }))
        }
    }

    //FIXME Add the school that uploaded the data to the parameters

    async createCourse(course: CreateCourseDTO): FutureErrorOrSuccess<Course> {
        try {
            const result = await CourseModel.create(course);
            return E.right(SuccessResponse({
                message: "Successfully created courses",
                result,
                status: HttpStatusCode.Created
            }))

        } catch (e: any) {
            return E.left(ErrorResponse({
                status: HttpStatusCode.InternalServerError,
                message: e.message || "Error fetching courses from the internet"
            }))
        }

    }

    async bulkCreateCourse(): FutureErrorOrSuccess<any> {
        try {
            return E.right(SuccessResponse({
                message: "We are processing your bulk upload",
                status: 200
            }))
        }
        catch (e) {
            return E.left(ErrorResponse({
                message: "Unable to process your bulk file"
            }))
        }
    }
}