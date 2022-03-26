import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '../../config/config.service'
import { ElasticService } from '../../elastic/elastic.service'

@Injectable()
export class AssistantService {

    @Inject() private readonly elasticService: ElasticService
    @Inject() private readonly configService: ConfigService


    generateAssistant() {

        const body = [
            {
                "title": "Bugünün yemekhane menüsü için  -https://www.yasar.edu.tr/|tıklayın-",
                keywords: ["yemek", "yemekhane", "bugün", "yiyecek"]
            },
            {
                "title": "Evet kampüs içi maske takmak zorunludur.",
                keywords: ["maske", "zorunlu", "covid", "virüs", "virus"]
            },
            {
                "title": "Hes kodunuzu kayıt etmek için  -https://heskod2.yasar.edu.tr/smarthescode/home.faces|tıklayın",
                keywords: ["hes", "covid", "kayıt", "korona", "virüs", "virus"]
            },
            {
                "title": "Öğrenci bilgi sistemine giriş için -https://obs.yasar.edu.tr/|tıklayın-",
                keywords: ["obs", "giriş", "öğrenci", "bilgi"]
            },
            {
                "title": "Teşekkürler, iyiyim sen nasılsın?",
                keywords: ["selam", "naber", "nasılsın", "merhaba"]
            },
        ]


        return Promise.all(body.map(async (e, i) => {
            return this.elasticService.save(
                this.configService.elasticSearch.index.assistant,
                i.toString(),
                e
            )
        }))

    }

    async ask(question: string) {

        const query = {
            query: {
                bool: {
                    must: [
                        {
                            query_string: {
                                query: `*${question}*`,
                                fields: ['keywords'],
                            }

                        }
                    ]
                }
            }
        }


        const result = await this.elasticService.search(this.configService.elasticSearch.index.assistant, query)
        return result.length ? result : [{ text: "Üzgünüm. Seni anlayamadım başka bir şekilde yazar mısın lütfen?" }]
    }

}
