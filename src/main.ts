import { NestFactory } from '@nestjs/core';

import { AllExceptionsFilter } from './common/filter/all-exception.filter';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { winstonConfig } from './configs/winston.config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  app.useGlobalFilters(new AllExceptionsFilter());
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
