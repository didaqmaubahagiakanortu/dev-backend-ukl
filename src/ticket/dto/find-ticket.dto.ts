import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class FindTicketDto {
    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsString()
    origin?: string

    @IsOptional()
    @IsString()
    destination?: string
}