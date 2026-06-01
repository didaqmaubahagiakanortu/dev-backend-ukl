import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { $Enums, Role } from '@prisma/client';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    username?: string | undefined;

    @IsOptional()
    @IsString()
    password?: string | undefined;

    @IsEnum(Role)
    role?: $Enums.Role | undefined;
}
