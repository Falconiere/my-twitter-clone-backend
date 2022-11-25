import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as Module } from '@nestjs/typeorm';
import { User } from 'modules/users/users.entity';

interface DatabaseConfig {
  POSTGRES_USER: string;
  POSTGRES_PORT: number;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  PGADMIN_DEFAULT_EMAIL: string;
  PGADMIN_DEFAULT_PASSWORD: string;
}

export const TypeOrmModule = Module.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const constants = configService.get<DatabaseConfig>('database');
    return {
      type: 'postgres',
      host: 'localhost',
      port: constants.POSTGRES_PORT,
      username: constants.POSTGRES_USER,
      password: constants.POSTGRES_PASSWORD,
      database: constants.POSTGRES_DB,
      entities: [User],
      synchronize: true,
      dropSchema: true,
    };
  },
  inject: [ConfigService],
});
