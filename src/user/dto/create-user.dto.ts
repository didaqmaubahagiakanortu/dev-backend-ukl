import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../../generated/prisma/client";

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
