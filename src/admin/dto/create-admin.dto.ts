import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export class CreateAdminDto {
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
