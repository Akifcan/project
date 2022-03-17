import { Module, CacheModule } from '@nestjs/common'
import { RedisCacheService } from './redis-cache.service'
import * as redisStore from 'cache-manager-redis-store'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '../config/config.service'


@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.redis.host,
        port: configService.redis.port
      }),
    })
  ],
  providers: [RedisCacheService]
})
export class RedisCacheModule { }
