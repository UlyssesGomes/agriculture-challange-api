import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Farm } from './farm.entity';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farm])],
  providers: [FarmService],
  controllers: [FarmController]
})
export class FarmModule {}
