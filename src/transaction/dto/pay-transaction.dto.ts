import { Method } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class PayTransactionDto {
    @IsNotEmpty()
    @IsEnum(Method)
    method!: Method
}