import { ApiProperty } from "@nestjs/swagger";

export class HarvestDto {
    @ApiProperty({ example: '1', description: 'ID of the harvest' })
    id?: number;

    @ApiProperty({ example: '2025', description: 'Year of the harvest' })
    year: number;
}