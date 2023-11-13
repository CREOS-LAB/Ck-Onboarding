import { Service } from "typedi";
import { School, SchoolModel } from "../models/schools.model";
import { comparePassword, encodePassword } from "../utils/bcrypt";
import "reflect-metadata"
import EmailService from "./email.service";
import { upload } from "../utils/cloudinary";
import * as E from 'fp-ts/Either';
import { MongooseError } from "mongoose";
import { ErrorResponse, FutureErrorOrSuccess, SuccessResponse } from "../response";
import { HttpStatusCode } from "axios";
import { generateUserToken } from "../utils/generateToken";
import { AuthUser, UserType } from "../passport/types";
import { APP_URL } from "../config/app.config";
import { UploadedStudentServices } from "./uplodaded_students.service";
import { StudentServices } from "./student.service";
import { TeacherServices } from "./teacher.service";
import { infoLogger } from "../logger";


@Service()
export class SchoolsServices {
    constructor(
        private readonly model = SchoolModel,
        private readonly emailService: EmailService,
        private uploadedStudents: UploadedStudentServices,
        private studentServices: StudentServices,
        private teacherServices: TeacherServices
    ) { }


    signUp = async (school: Partial<School>): FutureErrorOrSuccess<School> => {
        try {
            const schoolExists = await this.model.findOne({
                $or: [{ email: school.email }, { name: school.name }]
            }).select(["name", "email"]);

            console.log(schoolExists)

            if (schoolExists) {
                return E.left(ErrorResponse({
                    message: "A user with the email or name already exists",
                    status: HttpStatusCode.Conflict,
                }))
            }
            school.password = await encodePassword(school.password!);
            const newSchool = await this.model.create(school)

            const user: AuthUser = {
                name: newSchool.name,
                id: newSchool.id,
                email: newSchool.email,
                userType: UserType.SCHOOL
            }

            const result = newSchool.toObject()
            delete result.password;

            return E.right(
                SuccessResponse<School>({
                    message: "Successfully created a new school",
                    result,
                    status: 201,
                    cookie: {
                        name: "auth",
                        value: generateUserToken(user)
                    }
                })
            );
        } catch (e) {
            if (e instanceof MongooseError) {
                return E.left(
                    ErrorResponse({
                        message: e.message || "An unknown error occurred",
                        status: HttpStatusCode.InternalServerError,
                    })
                )
            }
            else {
                return E.left(
                    ErrorResponse({
                        message: (e as any)?.message || "An unknown error occurred",
                        status: HttpStatusCode.InternalServerError,
                    })
                )
            }
        }
    }

    signIn = async (school: Partial<School>): FutureErrorOrSuccess<School> => {
        try {


            const foundSchool = await this.model.findOne({ email: school.email }).select("+password")

            if (foundSchool == null) {
                return E.left(
                    ErrorResponse({
                        message: "We couldn't find this account",
                        status: HttpStatusCode.NotFound,
                    })
                )
            }

            const isPasswordValid = await comparePassword(school.password!, foundSchool?.password!);

            if (isPasswordValid) {

                const result = foundSchool.toJSON()

                delete result.password;

                const user: AuthUser = {
                    name: result.name,
                    id: result.id,
                    email: result.email,
                    userType: UserType.SCHOOL,
                }

                return E.right(SuccessResponse({
                    message: "Successfully logged in",
                    result: foundSchool,
                    status: HttpStatusCode.Ok,
                    cookie: {
                        name: "auth",
                        value: generateUserToken(user)
                    }
                }));
            } else {
                return E.left(
                    ErrorResponse({
                        message: "Invalid password",
                        status: HttpStatusCode.BadRequest,
                    })
                )
            }

        } catch (e) {
            return E.left(ErrorResponse(
                {
                    message: (e as any).message || "Your sign-in failed  due to an unknown issue",
                }
            ))
        }
    }

    getLoggedInSchool = async (user: AuthUser): FutureErrorOrSuccess<School> => {
        try {


            const school = await this.model.findOne({ id: user.id });
            if (school) {
                return E.right(SuccessResponse({
                    message: "Successfully fetched logged in school",
                    result: school,
                }))
            } else {
                return E.left(ErrorResponse({
                    message: "Couldn't fetch logged in school",
                    status: HttpStatusCode.NotFound
                }))
            }
        }
        catch (e: any) {
            return E.left(ErrorResponse({
                message: e.message || "Couldn't fetch logged in school",
                status: HttpStatusCode.InternalServerError
            }))
        }
    }

    getSchoolDetails = async (user: AuthUser): FutureErrorOrSuccess<any> => {
        try {
            const school = user;
            let allUploadedStudents: number = 0;
            let totalStudents: number = 0;
            let totalTeachers: number = 0;
            let result = { allUploadedStudents, totalStudents, totalTeachers }
            return E.right(SuccessResponse({
                result,
                message: "Successfully fetched school details",
            }))
        }
        catch (err: any) {
            return E.left(ErrorResponse({
                message: err.message || "Couldn't fetch school details",
                status: HttpStatusCode.InternalServerError
            }))
        }
    }

    signInGoogle = async (user: AuthUser, err?: any): FutureErrorOrSuccess<any> => {
        try {
            if (err) {
                return E.left(
                    ErrorResponse({
                        message: "Your account doesn't exist",
                        redirect: {
                            link: `${APP_URL}/signup`
                        }
                    })
                )
            }

            const token = generateUserToken(user)
            return E.right(SuccessResponse({
                cookie: {
                    name: "auth",
                    value: token,
                },
                redirect: {
                    link: `${APP_URL}/schools-dashboard`,
                }
            }))
        }
        catch (e) {
            console.log(e)
            return E.left(ErrorResponse({
                message: "Couldn't log user in",
                redirect: {
                    link: `${APP_URL}/signup`
                }
            }))
        }
    }






    async getSchoolById(_id: string) {
        let school = await this.model.findById(_id)
        return school
    }


    async getSchoolByKey(key: string) {
        let school = await this.model.findOne({ productKey: key })
        return school
    }

    async getSchoolByEmail(email: string) {
        let school = await this.model.findOne({ email })
        return school
    }

    async update(id: string, data: any) {
        if (data.profilePicture) {
            data.profilePicture = await upload(data.profilePicture.base64)
        }

        let school = await this.model.findByIdAndUpdate(id, data, { new: true });
        return school
    }

    async delete(id: string) {
        let school = await this.model.findByIdAndDelete(id)
        return school
    }

    async getAll() {
        let school = await this.model.find();
        return school;
    }
}