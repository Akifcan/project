import { Module, CacheModule } from '@nestjs/common'
import { RedisCacheService } from './redis-cache.service'
import * as redisStore from 'cache-manager-redis-store'
import { ConfigService } from '../config/config.service'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: `redis://${configService.redis.username}:${configService.redis.password}@${configService.redis.host}:${configService.redis.port}`,
        ttl: 0
      }),
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule { }
