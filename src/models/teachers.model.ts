import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDate } from 'class-validator';
import { User } from './user.model';
import { Class } from './classes.model';
import { School } from './schools.model';


export class Teacher extends User {

    @IsOptional()
    @prop({ ref: () => Class })
    class?: Ref<Class>;


    @IsOptional()
    @IsString()
    @prop({ default: 'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg' })
    profilePicture?: string;

    @IsOptional()
    @prop({ ref: () => School })
    school?: Ref<School>;

    @IsOptional()
    @IsString()
    @prop()
    ageRange?: string;

    @IsOptional()
    @IsString()
    @prop()
    resetPasswordToken?: string;

    @IsOptional()
    @IsDate()
    @prop()
    resetTokenExpires?: Date;
}

export const TeacherModel = getModelForClass(Teacher, { schemaOptions: { timestamps: true } });
