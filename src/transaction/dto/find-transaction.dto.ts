import { Method, Status } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class FindTransactionDto {
    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsNumber()
    passengerId?: number

    @IsOptional()
    @IsEnum(Method)
    method?: Method

    @IsOptional()
    @IsEnum(Status)
    status?: Status
}