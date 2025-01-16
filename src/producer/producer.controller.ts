import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiProperty, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ProducerService } from './producer.service';
import { ProducerDto } from './dto/producer.dto';

@ApiTags('Producer')
@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) { }

  @Get()
  @ApiOperation({ summary: 'Find all producers' })
  @ApiResponse({ status: 200, description: 'List of all producers' })
  findAll() {
    return this.producerService.findAll();
  }

  @Post()
  @ApiBody({ type: ProducerDto, description: 'Json structure for producer object.'})
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiResponse({ status: 201, description: 'Producer created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  create(@Body() createProducerDto: ProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a producer by ID' })
  @ApiResponse({ status: 200, description: 'Producer updated successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producer to update'})
  update(@Body() updateProducerDto: ProducerDto, @Param('id') id: number) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a producer by ID' })
  @ApiResponse({ status: 200, description: 'Producer found successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producer to find'})
  findById(@Param('id') id: number) {
    return this.producerService.findOne(id);
  }

  @Get('/:id/details')
  @ApiOperation({ summary: 'Find a producer by ID filled with its farm, harvest and planted crop related.' })
  @ApiProperty({ example: '1', description: 'ID of the producer to find' })
  @ApiResponse({ status: 200, description: 'Producer found successfully with details' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producer to find with details'})
  findByIdWithDetails(@Param('id') id: number) {
    return this.producerService.findOneWithDetails(id);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a producer by ID' })
  @ApiResponse({ status: 204, description: 'Producer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producer to delete'})
  remove(@Param('id') id: number) {
    this.producerService.delete(id);
    return { };
  }
}
