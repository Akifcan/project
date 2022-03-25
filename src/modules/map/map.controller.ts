import { Body, Controller, Inject, Post } from '@nestjs/common'
import { Public } from 'src/common/decorators/public.decorator'
import { MapService } from './map.service'

@Controller('map')
export class MapController {

    @Inject() private readonly mapService: MapService

    @Public()
    @Post("/reverse")
    reverse(@Body() body: { long: number, lat: number }) {
        return this.mapService.reverse(body.long, body.lat)
    }

}
