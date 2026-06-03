import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateSeatDto {
    @IsOptional()
    @IsString()
    code?: string

    @IsOptional()
    @IsString()
    taken?: string
}
