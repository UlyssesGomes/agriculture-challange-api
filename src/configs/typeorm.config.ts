import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { passwordConfig } from './password.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: passwordConfig.username,
    password: passwordConfig.password,
    database: passwordConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};