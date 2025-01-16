import { ApiProperty } from "@nestjs/swagger";

import { ProducerType } from "../producer.enum";
import { MaxLength, MinLength } from "class-validator";

export class ProducerDto {
    @ApiProperty({ example: '1', description: 'ID of the producer' })
    id?: number;

    @ApiProperty({ example: '12345678901234', description: 'CNPJ of the producer' })
    @MaxLength(14)
    cnpj?: string;

    @ApiProperty({ example: '98765432109', description: 'CPF of the producer' })
    @MaxLength(11)
    cpf?: string;

    @ApiProperty({ example: 'John Doe', description: 'Name of the producer' })
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 'PF', description: 'Type of the producer, must be PF or PJ' })
    type: ProducerType;
}