import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDate, IsEmpty } from 'class-validator';
import { User } from './user.model';
import { generateProductkey } from '../utils/generateToken';
import { Student } from './students.model';

export class School extends User {

    @IsEmpty()
    @prop({ required: true, default: () => generateProductkey() })
    productKey?: string;


    @prop({ required: true, default: [] })
    students?: Ref<Student>[];

    @prop()
    resetPasswordToken?: string;


    @prop()
    resetTokenExpires?: Date;
}

export const SchoolModel = getModelForClass(School, { schemaOptions: { timestamps: true, } });
