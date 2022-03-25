import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { JSDOM } from "jsdom"
import { lastValueFrom } from 'rxjs'
import { RedisCacheService } from '../../redis-cache/redis-cache.service'
import { Cron } from '@nestjs/schedule'

const every12HourCron = "* 12 * * *"
const every6HourCron = "* 6 * * *"

@Injectable()
export class NewsService {
    @Inject() private httpService: HttpService
    @Inject() private cacheService: RedisCacheService

    newsCacheName = "news"
    announcementsCacheName = "announcements"

    // @Cron(every12HourCron)
    handleNews() {
        this.createNews()
    }

    // @Cron(every6HourCron)
    handleAnnouncements() {
        this.createAnnouncements()
    }


    async createNews() {
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
        this.cacheService.set(this.newsCacheName, JSON.stringify(result))
        Logger.log("redis", "Saved to cache")
    }

    async createAnnouncements() {
        const response = await lastValueFrom(this.httpService.get("https://www.yasar.edu.tr/"))
        const dom = new JSDOM(response.data)
        const annnouncementsBase = [...dom.window.document.querySelectorAll(".post")]
        const result = annnouncementsBase.map(item => {
            const a = item.querySelector("a")
            const href = a.getAttribute("href")
            const text = a.textContent

            return {
                href,
                text
            }
        })
        this.cacheService.set(this.announcementsCacheName, JSON.stringify(result))
        Logger.log("redis", "Saved to cache")
    }

    async getLastNews() {
        return this.cacheService.getJson(this.newsCacheName)
    }

    async getAnnouncements() {
        return this.cacheService.getJson(this.announcementsCacheName)
    }

}
