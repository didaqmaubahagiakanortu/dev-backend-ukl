import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
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
