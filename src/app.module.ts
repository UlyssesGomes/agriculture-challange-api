import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './configs/typeorm.config';
import { ProducerModule } from './producer/producer.module';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';
import { PlantedCropModule } from './planted-crop/planted-crop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    ConfigModule.forRoot({ isGlobal: true }),
    ProducerModule, 
    FarmModule, 
    HarvestModule, 
    PlantedCropModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
