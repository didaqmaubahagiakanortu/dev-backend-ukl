import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    ticketAmount!: number

    @IsNotEmpty()
    @IsNumber()
    passengerId!: number

    @IsNotEmpty()
    @IsNumber()
    ticketId!: number
}
