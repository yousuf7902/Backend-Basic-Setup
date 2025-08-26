import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from './utils/cache/cache.module';
import dbConfigService from './config/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()), CacheModule], 
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
