import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Farm } from './farm.entity';
import { FarmService } from './farm.service';

@Controller('farm')
export class FarmController {
    constructor(private readonly farmService: FarmService) { }

    @Get()
    async getAllFarms(): Promise<Farm[]> {
        return await this.farmService.getAllFarms();
    }

    @Post()
    async createFarm(@Body() farmData: any): Promise<Farm> {
        return await this.farmService.createFarm(farmData);
    }

    @Get('/:id')
    async getFarmById(@Param('id') id: number): Promise<Farm | undefined> {
        return await this.farmService.getFarmById(id);
    }

    @Get('/producer/:producerId')
    async getFarmsByProducer(@Param('producerId') producerId: number): Promise<Farm[]> {
        return await this.farmService.getFarmsByProducer(producerId);
    }

    @Put('/:id')
    async updateFarm(
        @Param('id') id: number,
        @Body() updateFarmDto: any,
    ): Promise<Farm | undefined> {
        return await this.farmService.updateFarm(id, updateFarmDto);
    }

    @Delete('/:id')
    async deleteFarm(@Param('id') id: number): Promise<void> {
        return await this.farmService.deleteFarm(id);
    }
}
