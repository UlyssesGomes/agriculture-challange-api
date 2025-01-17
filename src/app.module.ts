import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './configs/typeorm.config';
import { ProducerModule } from './modules/producer/producer.module';
import { FarmModule } from './modules/farm/farm.module';
import { HarvestModule } from './modules/harvest/harvest.module';
import { PlantedCropModule } from './modules/planted-crop/planted-crop.module';
import { WinstonModule } from 'nest-winston';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { winstonConfig } from './configs/winston.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
    ProducerModule,
    FarmModule,
    HarvestModule,
    PlantedCropModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
