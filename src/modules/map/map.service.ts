import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class MapService {

    @Inject() private readonly httpService: HttpService

    async reverse(long: number, lat: number) {
        const result = await lastValueFrom(this.httpService.get(`/${lat},${long}.json`))
        const place = result.data?.features[0]
        return place ? {
            title: place.text,
            address: place.place_name
        } : {}
    }

}
