import { Body, Controller, Inject, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { User } from '../../common/decorators/user.decorator'
import RoleGuard from '../../common/guards/role.guard'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { AnnouncementService } from './announcement.service'
import { CreateAnnouncementDto, CreateAnnouncementForLessonDto } from './dtos/createAnnouncement.dto'

@Controller('announcement')
export class AnnouncementController {

    @Inject() private readonly announcementService: AnnouncementService

    @UseGuards(new RoleGuard(['teacher']))
    @UseInterceptors(FilesInterceptor('files'))
    @Post('/for-lesson',)
    createAnnouncementForLesson(@Body() createAnnouncementDto: CreateAnnouncementForLessonDto, @User() user: CurrentUserProps, @UploadedFiles() files: Express.Multer.File[]) {
        return this.announcementService.createAnnouncement(user.id, createAnnouncementDto, createAnnouncementDto.id)
    }

    @UseGuards(new RoleGuard(['moderator']))
    @UseInterceptors(FilesInterceptor('files'))
    @Post('/for-general')
    createAnnouncementForGeneral(@Body() createAnnouncementDto: CreateAnnouncementDto, @User() user: CurrentUserProps, @UploadedFiles() files: Express.Multer.File[]) {
        return this.announcementService.createAnnouncement(user.id, createAnnouncementDto, 10)
    }

}
