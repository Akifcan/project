import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom } from 'rxjs'
import { Place } from '../../entities/place.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MapService {

    @Inject() private readonly httpService: HttpService
    @InjectRepository(Place) readonly placeRepository: Repository<Place>

    schollPlaces() {
        return this.placeRepository.find()
    }

    async reverse(long: number, lat: number) {
        const result = await lastValueFrom(this.httpService.get(`/${lat},${long}.json`))


        const place = result.data?.features[0]
        return place ? {
            success: true,
            title: place.text,
            address: place.place_name
        } : {
            success: false
        }
    }

}
