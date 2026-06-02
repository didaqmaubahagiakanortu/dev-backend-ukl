import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    @IsOptional()
    @IsString()
    origin?: string | undefined

    @IsOptional()
    @IsString()
    destination?: string | undefined

    @IsOptional()
    @IsDateString()
    departure?: Date | undefined

    @IsOptional()
    @IsDateString()
    arrival?: Date | undefined

    @IsOptional()
    @IsNumber()
    price?: number | undefined

    @IsOptional()
    @IsNumber()
    carriageId?: number | undefined
}
