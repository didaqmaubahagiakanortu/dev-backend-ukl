import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsEnum(Role)
    role!: Role;
}
