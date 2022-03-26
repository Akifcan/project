import { Module } from '@nestjs/common'
import { MapService } from './map.service'
import { MapController } from './map.controller'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '../../config/config.module'
import { ConfigService } from '../../config/config.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Place } from '../../entities/place.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        params: {
          "access_token": configService.mapbox.apiKey
        },
        baseURL: configService.mapbox.baseUrl,
      }),
    })
  ],
  providers: [MapService],
  controllers: [MapController]
})
export class MapModule { }
