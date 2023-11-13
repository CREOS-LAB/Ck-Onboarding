export type AuthUser = {
    name: string;
    id: string;
    email: string;
    userType: UserType
}


export enum UserType {
    SCHOOL = "school",
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}