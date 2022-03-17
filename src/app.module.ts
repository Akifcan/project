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
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './modules/auth/auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { FileModule } from './modules/file/file.module'
import { CommentModule } from './modules/comment/comment.module'
import { DemandModule } from './modules/demand/demand.module'
import { PostModule } from './modules/post/post.module'
import { ScheduleModule } from './modules/schedule/schedule.module'
import { HttpExceptionFilter } from './common/exceptions/httpExceptionFilter'
import { NotificationModule } from './modules/notification/notification.module'
import { RedisCacheModule } from './redis-cache/redis-cache.module'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.auth.jwt,
        signOptions: { expiresIn: '60s' },
      })
    }),
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
    FileModule,
    CommentModule,
    DemandModule,
    PostModule,
    ScheduleModule,
    NotificationModule,
    RedisCacheModule,
  ],
})
export class AppModule { }

