import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {

    @IsOptional()
    @IsOptional()
    ticketAmount!: number | undefined

    @IsOptional()
    @IsNumber()
    passengerId!: number | undefined

    @IsOptional()
    @IsNumber()
    ticketId!: number | undefined
}
