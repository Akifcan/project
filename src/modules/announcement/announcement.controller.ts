import { Controller, Post, UseGuards } from '@nestjs/common'
import RoleGuard from 'src/common/guards/role.guard'

@Controller('announcement')
export class AnnouncementController {

    @UseGuards(new RoleGuard('teacher'))
    @Post('/for-lesson')
    createAnnouncementForLesson() {
        return "ok"
    }
}
