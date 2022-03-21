import { Inject, Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class ElasticService {
    @Inject() private readonly elasticsearchService: ElasticsearchService

    save(index: string, id: string, body: Record<string, any>) {
        return this.elasticsearchService.index({
            id,
            index,
            body
        })
    }

    async search(index: string, query: Record<string, any>) {
        const { body } = await this.elasticsearchService.search({
            index,
            body: query
        })
        const hits = body.hits.hits
        return hits.map((item) => item._source)



    }
}