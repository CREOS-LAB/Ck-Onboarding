import { NormalizeEmail, Trim } from "class-sanitizer"
import { IsEmail, IsAlphanumeric, MinLength, IsNotEmpty } from "class-validator"
import { prop, getModelForClass } from "@typegoose/typegoose"

export class Notification {

    @prop({ required: true })
    title?: String

    @prop()
    text?: String

    @IsNotEmpty()
    @prop({ required: true })
    @Trim()
    userId?: String


    @prop({ required: true, enum: ["Student", "School", "Teacher", "Admin"] })
    userType?: String

    constructor(v: Partial<Notification>) {
        if (v) {
            Object.assign(this, v)
        }
    }

}


export const NotificationModel = getModelForClass(Notification)




