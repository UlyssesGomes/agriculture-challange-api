import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
    constructor(private readonly producerService: ProducerService) {}

    @Get()
    findAll() {
      return this.producerService.findAll();
    }
  
    @Post()
    create(@Body() createProducerDto: any) {
      return this.producerService.create(createProducerDto);
    }

    @Patch('/:id')
    update(@Body() updateProducerDto: any, @Param('id') id: string) {
      return this.producerService.update(id, updateProducerDto);
    }

    @Get('/:id')
    findById(@Param('id') id: string) {
      return this.producerService.findOne(+id);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
      return this.producerService.delete(+id);
    }
}
