import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Farm } from './farm.entity';
import { FarmService } from './farm.service';
import { FarmDto } from './dto/farm.dto';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get()
  @ApiOperation({ summary: 'Find all farms' })
  @ApiResponse({ status: 200, description: 'List of all farms' })
  async getAllFarms(): Promise<Farm[]> {
    return this.farmService.getAllFarms();
  }

  @Post()
  @ApiBody({ type: FarmDto, description: 'Json structure for farm object.' })
  @ApiOperation({ summary: 'Create a new farm' })
  @ApiResponse({ status: 201, description: 'Farm created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async createFarm(@Body() farmData: any) {
    return this.farmService.createFarm(farmData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a farm by ID' })
  @ApiResponse({ status: 200, description: 'Farm found successfully' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the farm to find',
  })
  async getFarmById(@Param('id') id: number) {
    return this.farmService.getFarmById(id);
  }

  @Get('/producer/:producerId')
  @ApiOperation({ summary: 'Find all farms associated by producer ID' })
  @ApiResponse({ status: 200, description: 'Farms found successfully' })
  @ApiResponse({ status: 404, description: 'Farms not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "ID of the Producer to find it's farms",
  })
  async getFarmsByProducerId(@Param('producerId') producerId: number) {
    return this.farmService.getFarmsByProducer(producerId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a farm by ID' })
  @ApiResponse({ status: 200, description: 'Farm updated successfully' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the farm to update',
  })
  async updateFarm(@Param('id') id: number, @Body() updateFarmDto: FarmDto) {
    const farmResponse = await this.farmService.updateFarm(id, updateFarmDto);

    if (!farmResponse)
      throw new NotFoundException(`Farm with ID ${id} not found`);

    return farmResponse;
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a farm by ID' })
  @ApiResponse({ status: 204, description: 'Farm deleted successfully' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the Farm to delete',
  })
  async deleteFarm(@Param('id') id: number) {
    const rowsAffected = await this.farmService.delete(id);
    if (rowsAffected === 0)
      throw new NotFoundException(`Farm with ID ${id} not found`);
    return;
  }
}
