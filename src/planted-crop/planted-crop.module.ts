import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlantedCrop } from './planted-crop.entity';
import { PlantedCropService } from './planted-crop.service';
import { PlantedCropController } from './planted-crop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCrop])],
  providers: [PlantedCropService],
  controllers: [PlantedCropController]
})
export class PlantedCropModule {}
