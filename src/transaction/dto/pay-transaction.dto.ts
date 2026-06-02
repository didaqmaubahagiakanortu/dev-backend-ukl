import { Method } from "@prisma/client";
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayTransactionDto {
    @IsNotEmpty()
    @IsEnum(Method)
    method!: Method

    @ArrayNotEmpty()
    @IsArray()
    @IsInt({each: true})
    seatIds!: number[]
}