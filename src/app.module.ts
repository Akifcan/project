import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { UserModule } from './modules/user/user.module'
import { SeederModule } from './seeder/seeder.module'
import { AnnouncementModule } from './modules/announcement/announcement.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.name,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    SeederModule,
    AnnouncementModule,
    AuthModule,
  ],
})
export class AppModule { }
