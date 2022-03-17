import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common'
import { Cache } from 'cache-manager'


@Injectable()
export class RedisCacheService {
    @Inject(CACHE_MANAGER) private readonly cache: Cache

    async get(key: string) {
        await this.cache.get(key)
    }

    async set(key: string, value: string) {
        await this.cache.set(key, value)
    }

    async setJson(key: string, value: Record<string, any>) {
        await this.cache.set(key, JSON.stringify(value))
    }


}
