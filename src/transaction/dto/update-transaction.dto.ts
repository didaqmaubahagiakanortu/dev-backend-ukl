import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { $Enums, Method, Status } from '@prisma/client';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsOptional()
    @IsEnum(Method)
    method!: $Enums.Method | undefined

    @IsOptional()
    @IsEnum(Status)
    status!: $Enums.Status | undefined

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
