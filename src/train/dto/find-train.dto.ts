import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindTrainDto {
    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number
}