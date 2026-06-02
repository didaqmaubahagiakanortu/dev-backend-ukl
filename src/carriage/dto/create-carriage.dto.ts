import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Class } from "@prisma/client";

export class CreateCarriageDto {
    @IsNotEmpty()
    @IsString()
    code!: string

    @IsNotEmpty()
    @IsEnum(Class)
    classification!: Class

    @ArrayNotEmpty()
    @IsArray()
    @IsString({each: true})
    seats!: string[]
}
