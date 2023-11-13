import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsMongoId } from "class-validator";
import { Collection } from "./collections.model";
import { Student } from "./students.model";
import { Teacher } from "./teachers.model";
import { School } from "./schools.model";

export class Video {
    @IsOptional()
    @IsString()
    @prop()
    name?: string;

    @IsOptional()
    @IsString()
    @prop()
    description?: string;

    @IsNotEmpty()
    @IsString()
    @prop({ required: true })
    link!: string;

    @IsOptional()
    @prop({ ref: () => Collection })
    collection?: Ref<Collection>;

    @IsOptional()
    @IsMongoId({ each: true })
    @prop({ ref: () => Student })
    views?: Ref<Student>[];

    @IsOptional()
    @IsMongoId({ each: true })
    @prop({ ref: () => Student, default: [] })
    watched!: Ref<Student>[];

    @IsOptional()
    @IsMongoId({ each: true })
    @prop({ ref: () => Student, default: [] })
    completed!: Ref<Student>[];

    @IsOptional()
    @IsString()
    @prop({ default: "https://education-ga.ketcloud.ket.org/wp-content/uploads/letslearn.jpg" })
    cover?: string;

    @IsOptional()
    @IsNumber()
    @prop()
    maxAge?: number;

    @IsOptional()
    @IsNumber()
    @prop()
    minAge?: number;

    @IsOptional()
    @IsString()
    @prop()
    category?: string;

    @IsOptional()
    @IsMongoId()
    @prop({ ref: () => Teacher })
    createdByTeacher?: Ref<Teacher>;

    @IsOptional()
    @IsMongoId()
    @prop({ ref: () => School })
    createdBySchool?: Ref<School>;
}

export const VideoModel = getModelForClass(Video, { schemaOptions: { timestamps: true } });
