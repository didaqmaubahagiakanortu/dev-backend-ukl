import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FindSeatDto {
    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsString()
    taken?: string
    
    @IsOptional()
    @IsNumber()
    carriageId?: number
}