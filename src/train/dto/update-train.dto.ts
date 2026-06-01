import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainDto } from './create-train.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrainDto extends PartialType(CreateTrainDto) {
        @IsOptional()
        @IsString()
        name?: string | undefined
    
        @IsOptional()
        @IsNumber()
        carriageId?: number | undefined
}
