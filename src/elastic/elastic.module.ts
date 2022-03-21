import { Module } from '@nestjs/common'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { ElasticService } from './elastic.service'


@Module({
    imports: [
        ConfigModule,
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                node: configService.elasticSearch.host,
                auth: {
                    username: configService.elasticSearch.username,
                    password: configService.elasticSearch.password,
                }
            }),
        }),
    ],
    providers: [ElasticService],
    exports: [ElasticService],
})
export class ElasticModule { }
