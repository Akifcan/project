import { Controller, Inject, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { FileService } from './file.service'

@Controller('file')
export class FileController {

    @Inject() private readonly fileService: FileService


    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    upload(@User() user: CurrentUserProps, @UploadedFiles() files: Express.Multer.File[]) {
        return this.fileService.upload(user, files, "announcements")
    }
}
