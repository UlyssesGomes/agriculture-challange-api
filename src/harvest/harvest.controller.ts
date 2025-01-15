import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Harvest } from './harvest.entity';
import { HarvestService } from './harvest.service';

@Controller('harvest')
export class HarvestController {
    constructor(private readonly harvestService: HarvestService) {}

  @Get()
  async getAllHarvests(): Promise<Harvest[]> {
    return await this.harvestService.getAllHarvests();
  }

  @Post()
  createHarvest(@Body() harvestData: Partial<Harvest>) {
    return this.harvestService.createHarvest(harvestData);
  }

  @Get('/:id')
  async getHarvestById(@Param('id') id: number): Promise<Harvest | undefined> {
    return await this.harvestService.getHarvestById(id);
  }

  @Put('/:id')
  async updateHarvest(
    @Param('id') id: number,
    @Body() harvestData: any,
  ): Promise<Harvest | undefined> {
    return await this.harvestService.updateHarvest(id, harvestData);
  }

  @Delete('/:id')
  async deleteHarvest(@Param('id') id: number): Promise<void> {
    return await this.harvestService.deleteHarvest(id);
  }
}
