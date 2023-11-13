
import { Trim } from "class-sanitizer/decorators/sanitizers/trim.decorator";
import { IsEmail, IsNotEmpty } from "class-validator"

export class SchoolSignUpDTO {
    @Trim()
    @IsNotEmpty()
    name!: string;

    @Trim()
    @IsEmail()

    email!: string;

    @IsNotEmpty()
    password?: string
}

export class SchoolSignInDTO {

    @Trim()
    @IsEmail()

    email!: string;

    @IsNotEmpty()
    password?: string
}