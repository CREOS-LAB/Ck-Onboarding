import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";


export class CreateCourseDTO {
    @IsNotEmpty()
    @Trim()
    name!: string;

    @IsNotEmpty()
    @Trim()
    description!: string;

    @IsUrl()
    @IsOptional()
    @Trim()
    cover?: string;
}