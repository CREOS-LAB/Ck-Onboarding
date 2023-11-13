import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsDate } from 'class-validator';
import { User } from './user.model';
import { required } from 'joi';
import { School } from './schools.model';
import { Course } from './courses.model';


export class Admin extends User {
}

export const AdminModel = getModelForClass(Admin, { schemaOptions: { timestamps: true } });
