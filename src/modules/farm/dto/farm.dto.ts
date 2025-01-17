import { ApiProperty } from '@nestjs/swagger';

export class FarmDto {
  @ApiProperty({ example: '1', description: 'ID of the farm' })
  id?: number;

  @ApiProperty({ example: 'Happy Farm LTDA', description: 'Name of the farm' })
  name: string;

  @ApiProperty({ example: 'Campina Grande', description: 'City of the farm' })
  city: string;

  @ApiProperty({ example: 'PB', description: 'State of the farm' })
  state: string;

  @ApiProperty({
    example: 100.0,
    description: 'Total area of the farm in hectares',
  })
  totalArea: number;

  @ApiProperty({
    example: 50.0,
    description: 'Vegetation area of the farm in hectares',
  })
  vegetationArea: number;

  @ApiProperty({
    example: 30.0,
    description: 'Arable area of the farm in hectares',
  })
  arableArea: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the producer associated with the farm',
  })
  producerId?: number;
}
