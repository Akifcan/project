import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { JSDOM } from "jsdom"
import { lastValueFrom } from 'rxjs'

@Injectable()
export class NewsService {
    @Inject() private httpService: HttpService

    async getLastNews() {
        const response = await lastValueFrom(this.httpService.get('https://haber.yasar.edu.tr/'))
        const dom = new JSDOM(response.data)
        const newsBase = [...dom.window.document.querySelectorAll(".tdb_module_loop_2")]
        const result = newsBase.map(item => {
            const redirectLink = item.querySelector(".td-module-thumb a").getAttribute("href")
            const thumbnail = item.querySelector(".entry-thumb").getAttribute("data-img-url")
            const categoryRedirectLink = item.querySelector(".td-post-category").getAttribute("href")
            const categoryName = item.querySelector(".td-post-category").textContent
            const title = item.querySelector(".td-module-title").textContent

            return {
                title,
                redirectLink,
                thumbnail,
                categoryRedirectLink,
                categoryName,
            }
        })
        console.log(JSON.stringify(result))

        return result
    }

}
