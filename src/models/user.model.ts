import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsAlphanumeric, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, Matches, } from "class-validator";
import { Trim, CustomSanitizer } from "class-sanitizer";
import { v4 } from "uuid";

export class User {

    @prop({ required: true, default: () => v4(), unique: true })
    id!: string

    @prop()
    profilePicture?: string;

    @Trim()
    @IsNotEmpty({ groups: ["sign-up"], message: 'Name is required' })
    // @Matches(/^[a-zA-Z]+ [a-zA-Z]+$/, {
    //     message: 'Name must include both a first and last name',
    //     groups: ["sign-up"]
    // })
    @prop({ required: true })
    name!: string;

    @Trim()
    @IsEmail({}, { groups: ["sign-up", "sign-in"] })
    @prop({ required: true, unique: true })
    email!: string;

    @IsOptional()
    @IsPhoneNumber()
    @prop({ required: false })
    phoneNumber?: string

    @IsNotEmpty()
    @prop({ required: true, select: false, })
    password?: string


    @prop({ required: true, default: false })
    googleEnabled?: boolean

    @prop({ required: true, default: false })
    outlookEnabled?: boolean

    constructor(v: Partial<User>) {
        if (v) {
            Object.assign(this, v)
        }
    }
}

export const UserModel = getModelForClass(User, {

})


