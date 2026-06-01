import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    origin!: string

    @IsNotEmpty()
    @IsString()
    destination!: string

    @IsNotEmpty()
    @IsDateString()
    departure!: Date

    @IsNotEmpty()
    @IsDateString()
    arrival!: Date

    @IsNotEmpty()
    @IsNumber()
    price!: number

    @IsNotEmpty()
    @IsNumber()
    trainId!: number

    @IsNotEmpty()
    @IsNumber()
    carriageId!: number
}
