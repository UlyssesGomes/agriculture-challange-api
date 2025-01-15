import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Harvest } from './harvest.entity';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest])],
  providers: [HarvestService],
  controllers: [HarvestController]
})
export class HarvestModule {}
