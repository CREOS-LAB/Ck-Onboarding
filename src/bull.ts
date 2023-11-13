import Queue from "bull"
import { SchoolModel } from "./models/schools.model"
import { StudentModel } from "./models/students.model"
import { CourseModel } from "./models/courses.model"
import xlsx from "xlsx"

export type CourseUploadJobData = {
    filename: string
}

export const bulkCourseUploadQueue = new Queue("bulk-course-upload")
export const bulkStudentUploadQueue = new Queue("bulk-student-upload")


bulkCourseUploadQueue.process(async (job, cb) => {
    const data = job.data as CourseUploadJobData;
    const content  = xlsx.readFile(data.filename)

    //TODO Read data from sheets


    //TODO Add To Courses
    

    //TODO Add notification for user
})