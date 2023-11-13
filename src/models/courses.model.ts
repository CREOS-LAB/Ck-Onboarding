import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import { IsAlphanumeric, IsOptional, IsNumber, IsUrl, IsAlpha, IsNotEmpty, } from "class-validator";
import { Collection } from "mongoose";
import { School } from "./schools.model";
import { Teacher } from "./teachers.model";
import  mongoosePaginate from "mongoose-paginate-v2";


@plugin(mongoosePaginate)
export class Course {

    @IsNotEmpty()
    @prop({ required: true })
    name!: string;

    @IsNotEmpty()
    @prop({ required: true })
    description!: string;

    @IsNotEmpty()
    @IsUrl()
    @prop({ required: true })
    cover?: string;

    @prop({ required: false, ref: () => Collection })
    collection?: Ref<Collection>


    @prop()
    views?: number

    @prop({ ref: () => School })
    school?: Ref<School>

    @prop({ ref: () => Teacher })
    teacher?: Ref<Teacher>
}

const course = new Course()


export const CourseModel = getModelForClass(Course, {
    
});

