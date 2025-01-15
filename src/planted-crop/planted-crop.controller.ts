import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { PlantedCrop } from './planted-crop.entity';
import { PlantedCropService } from './planted-crop.service';


@Controller('planted-crop')
export class PlantedCropController {
    constructor(private readonly plantedCropService: PlantedCropService) {}

  @Get()
  async getAllPlantedCrops(): Promise<PlantedCrop[]> {
    return await this.plantedCropService.getAllPlantedCrops();
  }

  @Post()
  async createPlantedCrop(@Body() plantedCropData: Partial<PlantedCrop>) {
    return await this.plantedCropService.createPlantedCrop(plantedCropData);
  }

  @Get('/:id')
  async getPlantedCropById(@Param('id') id: number): Promise<PlantedCrop | undefined> {
    return await this.plantedCropService.getPlantedCropById(id);
  }

  @Put('/:id')
  async updatePlantedCrop(
    @Param('id') id: number,
    @Body() plantedCropData: any,
  ): Promise<PlantedCrop | undefined> {
    return await this.plantedCropService.updatePlantedCrop(id, plantedCropData);
  }

  @Delete('/:id')
  async deletePlantedCrop(@Param('id') id: number): Promise<void> {
    return await this.plantedCropService.deletePlantedCrop(id);
  }
}
