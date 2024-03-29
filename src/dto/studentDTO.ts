import Gender from "../enum/gender";

export interface StudentDto{
    fullName: string,
    gender: Gender,
    email: string,
    productKey: string,
    dob: Date,
    password: string
    school: any,
    age: number
}

export interface LoginDto{
    email: string,
    password: string
}