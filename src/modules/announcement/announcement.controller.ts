import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { User } from '../../common/decorators/user.decorator'
import RoleGuard from '../../common/guards/role.guard'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { AnnouncementService } from './announcement.service'
import { CreateAnnouncementDto, CreateAnnouncementForLessonDto } from './dtos/createAnnouncement.dto'

@Controller('announcement')
export class AnnouncementController {

    @Inject() private readonly announcementService: AnnouncementService

    @UseGuards(new RoleGuard(['teacher']))
    @Post('/for-lesson')
    createAnnouncementForLesson(@Body() createAnnouncementDto: CreateAnnouncementForLessonDto, @User() user: CurrentUserProps) {
        return this.announcementService.createAnnouncement(user.id, createAnnouncementDto, createAnnouncementDto.id)
    }

    @UseGuards(new RoleGuard(['moderator']))
    @Post('/for-general')
    createAnnouncementForGeneral(@Body() createAnnouncementDto: CreateAnnouncementDto, @User() user: CurrentUserProps) {
        return this.announcementService.createAnnouncement(user.id, createAnnouncementDto, 10)
    }

}
