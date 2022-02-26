import { Controller, Post } from '@nestjs/common'

@Controller('announcement')
export class AnnouncementController {
    @Post()
    create() {
        return "ok"
    }
}
