import { Service } from "typedi";
import { Course, CourseModel } from "../models/courses.model";
import { ErrorResponse, PromiseErrorOrSuccess, SuccessResponse } from "../response";
import * as E from "fp-ts/Either"
import { HttpStatusCode } from "axios";
import { CreateCourseDTO } from "../dtos/course.dto";
import { Try } from "../utils/functional";
import { bulkCourseUploadQueue } from "../bull";

//TODO get courses specifically school using authentication data

@Service()
export class CourseService {
    async getAllCourses(limit?: number, page?: number): PromiseErrorOrSuccess<Course[]> {
        return Try(async () => {
            const courses = await CourseModel.find({})
            return courses;
        })
    }

    //FIXME Add the school that uploaded the data to the parameters

    async createCourse(course: CreateCourseDTO): PromiseErrorOrSuccess<Course> {
        return Try(async () => {
            const result = await CourseModel.create(course);
            return result;
        }, {
            error: "Unable to create a new course"
        })

    }

    async bulkCreateCourse(file: string): PromiseErrorOrSuccess<any> {
        return Try(async () => {
                await bulkCourseUploadQueue.add({
                    filename: file
                })
        }, { success: "Your courses are uploading, wait for your courses to upload" })
    }
}