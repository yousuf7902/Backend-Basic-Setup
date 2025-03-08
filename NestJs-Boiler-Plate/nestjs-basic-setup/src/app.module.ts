import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfigService from './Config/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig())],
  controllers: [],
  providers: [],
})
export class AppModule {}
