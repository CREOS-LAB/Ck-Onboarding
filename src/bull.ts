import Queue from "bull"
import { SchoolModel } from "./models/schools.model"
import { StudentModel } from "./models/students.model"
import { CourseModel } from "./models/courses.model"
import xlsx from "xlsx"
import { AuthUser } from "./passport/types"
import { infoLogger } from "./logger"

export type CourseUploadJobData = {
    filename: string,
    user?: any
}

export const bulkCourseUploadQueue = new Queue<CourseUploadJobData>("bulk-course-upload", {
    redis: {
        port: 6379
    }
})

export const bulkStudentUploadQueue = new Queue("bulk-student-upload", {
    redis: {
        port: 6379
    }
})


bulkCourseUploadQueue.process(async (job, cb) => {
    const data = job.data;
    infoLogger.log('info', "Started processing")
    const content = xlsx.readFile(data.filename, {

    })

    const json_data = xlsx.utils.sheet_to_json(content);

    // infoLogger.log("info", content)


    //TODO Read data from sheets


    //TODO Add To Courses


    //TODO Add notification for user

    //TODO SSE send that new notifications arrived
})