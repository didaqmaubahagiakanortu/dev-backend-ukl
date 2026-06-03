import { Class } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class FindCarriageDto {
    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsEnum(Class)
    classification?: Class

    @IsOptional()
    @IsNumber()
    trainId?: number
}