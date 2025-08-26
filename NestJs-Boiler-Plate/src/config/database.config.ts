import {TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

class DatabaseConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql', 
      host: this.env.DB_HOST,
      port: Number(this.env.DB_PORT) ,
      username: this.env.DB_USERNAME ,
      password: this.env.DB_PASSWORD ,
      database: this.env.DB_NAME ,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    };
  }
}

const dbConfigService = new DatabaseConfigService(process.env);

export default dbConfigService;