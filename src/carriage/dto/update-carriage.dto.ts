import { PartialType } from '@nestjs/mapped-types';
import { CreateCarriageDto } from './create-carriage.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Class } from '@prisma/client';

export class UpdateCarriageDto extends PartialType(CreateCarriageDto) {
        @IsOptional()
        @IsString()
        code?: string
    
        @IsOptional()
        @IsEnum(Class)
        classification?: Class
    
        @IsOptional()
        @IsNumber()
        price?: number
    
        @IsOptional()
        @IsNumber()
        capacity?: number
}
