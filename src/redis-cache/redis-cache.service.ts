import { Injectable, Inject, CACHE_MANAGER, Logger } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { Repository } from 'typeorm'


@Injectable()
export class RedisCacheService {
    @Inject(CACHE_MANAGER) private readonly cache: Cache

    async get(key: string) {
        return await this.cache.get(key)
    }

    async getJson(key: string) {
        const result = await this.cache.get(key)
        return result ? JSON.parse(result as any) : []
    }

    async set(key: string, value: string) {
        return await this.cache.set(key, value)
    }

    async setJson(key: string, value: Record<string, any>) {
        return await this.cache.set(key, JSON.stringify(value))
    }

    async pushToCache<T>(key: string, query: Record<string, any>, repository: Repository<T>) {
        try {
            const result = await repository.findOne(query)

            const cached = await this.getJson(key) as any[]
            cached.push(result)
            await this.setJson(key, cached)

            Logger.debug(await this.getJson(key))
        } catch (e) {
            Logger.warn(e)
        }
    }


}
