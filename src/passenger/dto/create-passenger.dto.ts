import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePassengerDto {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    phone!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string
}
