import { BadRequestException, ValidationError } from "@nestjs/common";

const FormatValidation = (errors: ValidationError[]): BadRequestException => {
    const messages = errors.map(x => 
        Object.values(x.constraints || {}).join(', ')
    ).join('; ')
    return new BadRequestException(`Error validation: ${messages}`)
}
export default FormatValidation