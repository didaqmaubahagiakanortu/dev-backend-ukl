import { Method, Status } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsEnum(Method)
    method!: Method

    @IsNotEmpty()
    @IsEnum(Status)
    status!: Status

    @IsNotEmpty()
    @IsNumber()
    ticketAmount!: number

    @IsNotEmpty()
    @IsNumber()
    passengerId!: number

    @IsNotEmpty()
    @IsNumber()
    ticketId!: number
}
