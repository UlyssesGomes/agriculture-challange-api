import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';

import { Harvest } from './harvest.entity';
import { HarvestService } from './harvest.service';
import { HarvestDto } from './dto/harvest.dto';

@ApiTags('Harvest')
@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) { }

  @Get()
  @ApiOperation({ summary: 'Find all harvests' })
  @ApiResponse({ status: 200, description: 'List of all harvests' })
  async getAllHarvests(): Promise<Harvest[]> {
    return await this.harvestService.getAllHarvests();
  }

  @Post()
  @ApiBody({ type: HarvestDto, description: 'Json structure for harvest object' })
  @ApiOperation({ summary: 'Create a new harvest' })
  @ApiResponse({ status: 201, description: 'Harvest created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  create(@Body() harvestData: Partial<Harvest>) {
    return this.harvestService.create(harvestData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a harvest by ID' })
  @ApiResponse({ status: 200, description: 'Harvest found successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the harvest to find' })
  async getHarvestById(@Param('id') id: number): Promise<Harvest | undefined> {
    return await this.harvestService.getHarvestById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a harvest by ID' })
  @ApiResponse({ status: 200, description: 'Harvest updated successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the harvest to update' })
  async updateHarvest(@Param('id') id: number, @Body() harvestData: any): Promise<Harvest | undefined> {
    const harvestResponse = await this.harvestService.update(id, harvestData);

    if (!harvestResponse)
      throw new NotFoundException(`Harvest with ID ${id} not found`);

    return harvestResponse;
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a harvest by ID' })
  @ApiResponse({ status: 204, description: 'Harvest deleted successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the harvest to delete' })
  async deleteHarvest(@Param('id') id: number): Promise<void> {
    const rowsAffected = await this.harvestService.delete(id);
      if (rowsAffected === 0)
          throw new NotFoundException(`Harvest with ID ${id} not found`);
      return;
  }
}
