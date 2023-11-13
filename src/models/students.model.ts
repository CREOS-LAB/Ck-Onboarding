import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsDate } from 'class-validator';
import { User } from './user.model';
import { required } from 'joi';
import { School } from './schools.model';
import { Course } from './courses.model';


export class Student extends User {

  @IsOptional()
  @IsString()
  @prop({ default: 'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg' })
  profilePicture?: string;

  @IsOptional()
  @IsString()
  @prop()
  gender?: string;


  @IsNotEmpty()
  @IsString()
  @prop({ required: true })
  productKey?: string;

  @IsOptional()
  @prop({ required: false, ref: () => School })
  school?: Ref<School>;

  @IsOptional()
  @IsDate()
  @prop()
  dob?: Date;

  @IsOptional()
  @IsNumber()
  @prop({ default: 0 })
  gem?: number;

  @IsOptional()
  @prop({ ref: () => Course })
  courses?: Ref<Course>[];

  @IsOptional()
  @IsNumber()
  @prop()
  hoursSpent?: number;

  @IsOptional()
  @IsString()
  @prop()
  stage?: string;

  @IsOptional()
  @IsString()
  @prop()
  badges?: string;

  @IsOptional()
  @IsString()
  @prop()
  achievement?: string;

  @IsOptional()
  @IsNumber()
  @prop({ default: 0 })
  streak?: number;

  @IsOptional()
  @IsNumber()
  @prop()
  age?: number;

  @IsOptional()
  @IsDate()
  @prop()
  last_logged_in?: Date;

  @IsOptional()
  @IsNumber()
  @prop({ default: 0 })
  completedCourses?: number;

  @IsOptional()
  @IsString()
  @prop()
  resetPasswordToken?: string;

  @IsOptional()
  @IsDate()
  @prop()
  resetTokenExpires?: Date;


}

export const StudentModel = getModelForClass(Student, { schemaOptions: { timestamps: true } });
