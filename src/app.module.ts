import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

// MODULE Y
import { TypeOrmModule } from 'modules/database/typeorm.module';

import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
