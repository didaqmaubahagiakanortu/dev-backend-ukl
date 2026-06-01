import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Class } from "@prisma/client";

export class CreateCarriageDto {
    @IsNotEmpty()
    @IsString()
    code!: string

    @IsNotEmpty()
    @IsEnum(Class)
    classification!: Class

    @IsNotEmpty()
    @IsNumber()
    price!: number

    @IsNotEmpty()
    @IsNumber()
    capacity!: number
}
