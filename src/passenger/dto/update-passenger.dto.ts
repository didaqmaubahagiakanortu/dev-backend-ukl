import { PartialType } from '@nestjs/mapped-types';
import { CreatePassengerDto } from './create-passenger.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdatePassengerDto extends PartialType(CreatePassengerDto) {
        @IsString()
        @IsOptional()
        name?: string | undefined
    
        @IsString()
        @IsOptional()
        phone?: string | undefined
    
        @IsString()
        @IsOptional()
        password?: string | undefined
}
