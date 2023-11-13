import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class CreateContactDTO {
    @IsNotEmpty()
    name!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    @Length(10, 250)
    message!: string
}