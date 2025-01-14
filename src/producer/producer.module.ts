import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Producer } from './producer.entity';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
    imports: [TypeOrmModule.forFeature([Producer])],
    controllers: [ProducerController],
    providers: [ProducerService],
})
export class ProducerModule {}
