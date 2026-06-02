import { Method } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class MethodTransactionDto {
    @IsNotEmpty()
    @IsEnum(Method)
    method!: Method
}