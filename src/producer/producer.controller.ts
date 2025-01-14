import { Body, Controller, Get, Post } from '@nestjs/common';

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
}
