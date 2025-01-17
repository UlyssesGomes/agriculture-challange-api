import { ApiProperty } from '@nestjs/swagger';

import { MaxLength } from 'class-validator';

export class PlantedCropDto {
  @ApiProperty({ example: '1', description: 'ID of the planted crop' })
  id?: number;

  @ApiProperty({ example: 'Corn', description: 'Type of the crop' })
  @MaxLength(300)
  crop: string;
}
