import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import jsdom from "jsdom"
import { lastValueFrom } from 'rxjs'

@Injectable()
export class NewsService {
    @Inject() private httpService: HttpService

    async getLastNews() {
        const response = await lastValueFrom(this.httpService.get('https://haber.yasar.edu.tr/'))
        console.log(response)

    }

}
