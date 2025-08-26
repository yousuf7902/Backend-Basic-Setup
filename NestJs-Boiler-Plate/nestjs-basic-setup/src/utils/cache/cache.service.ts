import { Inject, Injectable } from '@nestjs/common';
import Keyv from 'keyv';

@Injectable()
export class CacheService {
  constructor(@Inject('CACHE_INSTANCE') private readonly cache: Keyv){}

  async getCache(key: string){
    const value = await this.cache.get(key);
    if(!value) return undefined;
    return value;
  }

  async setCache(key:string, value: any, ttl: number){ 
    await this.cache.set(key, value, ttl);
  }

  async deleteCache(key: string){
    await this.cache.delete(key);
  }
}
