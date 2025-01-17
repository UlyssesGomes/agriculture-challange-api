import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { PlantedCrop } from './planted-crop.entity';
import { PlantedCropService } from './planted-crop.service';
import { PlantedCropDto } from './dto/planted-crop.dto';

@ApiTags('Planted Crop')
@Controller('planted-crop')
export class PlantedCropController {
  constructor(private readonly plantedCropService: PlantedCropService) {}

  @Get()
  @ApiOperation({ summary: 'Find all planted crops' })
  @ApiResponse({ status: 200, description: 'List of all planted crops' })
  async getAllPlantedCrops(): Promise<PlantedCrop[]> {
    return await this.plantedCropService.getAllPlantedCrops();
  }

  @Post()
  @ApiBody({
    type: PlantedCropDto,
    description: 'Json structure for planted crop object.',
  })
  @ApiOperation({ summary: 'Create a new planted crop' })
  @ApiResponse({
    status: 201,
    description: 'Planted crop created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async createPlantedCrop(@Body() plantedCropData: Partial<PlantedCrop>) {
    return await this.plantedCropService.create(plantedCropData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a planted crop by ID' })
  @ApiResponse({ status: 200, description: 'Planted crop found successfully' })
  @ApiResponse({ status: 404, description: 'Planted crop not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the planted crop to find',
  })
  async getPlantedCropById(
    @Param('id') id: number,
  ): Promise<PlantedCrop | undefined> {
    return await this.plantedCropService.getPlantedCropById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a planted crop by ID' })
  @ApiResponse({
    status: 200,
    description: 'Planted crop updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Planted crop not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the planted crop to update',
  })
  async updatePlantedCrop(
    @Param('id') id: number,
    @Body() plantedCropData: any,
  ): Promise<PlantedCrop | undefined> {
    const plantedCropResponse = await this.plantedCropService.update(
      id,
      plantedCropData,
    );

    if (!plantedCropResponse) {
      throw new NotFoundException(`Planted crop with ID ${id} not found`);
    }

    return plantedCropResponse;
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a planted crop by ID' })
  @ApiResponse({
    status: 204,
    description: 'Planted crop deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Planted crop not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the planted crop to delete',
  })
  async deletePlantedCrop(@Param('id') id: number): Promise<void> {
    const rowsAffected = await this.plantedCropService.delete(id);
    if (rowsAffected === 0)
      throw new NotFoundException(`Planted crop with ID ${id} not found`);
    return;
  }
}
