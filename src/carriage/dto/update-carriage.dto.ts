import { PartialType } from '@nestjs/mapped-types';
import { CreateCarriageDto } from './create-carriage.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { $Enums, Class } from '@prisma/client';

export class UpdateCarriageDto extends PartialType(CreateCarriageDto) {
        @IsOptional()
        @IsString()
        code?: string | undefined
    
        @IsOptional()
        @IsEnum(Class)
        classification?: $Enums.Class | undefined
    
        @IsOptional()
        @IsNumber()
        price?: number | undefined
    
        @IsOptional()
        @IsNumber()
        capacity?: number | undefined
}
