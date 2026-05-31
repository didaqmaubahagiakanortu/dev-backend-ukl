import { PartialType } from '@nestjs/mapped-types';
import { CreatePassengerDto } from './create-passenger.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdatePassengerDto extends PartialType(CreatePassengerDto) {
        @IsString()
        @IsOptional()
        name?: string
    
        @IsString()
        @IsOptional()
        phone?: string
    
        @IsString()
        @IsOptional()
        password?: string
}
