import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { MapService } from './map.service'

@Controller('map')
export class MapController {

    @Inject() private readonly mapService: MapService

    @Post("/reverse")
    reverse(@Body() body: { long: number, lat: number }) {
        return this.mapService.reverse(body.long, body.lat)
    }

    @Get("/places")
    places() {
        return this.mapService.schollPlaces()
    }

}
