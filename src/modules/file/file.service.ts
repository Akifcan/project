import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference } from "firebase/storage"

import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from 'src/config/config.service'
import CurrentUserProps from "../auth/interface/currenetUser.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { File } from "./entities/file.entity"

export type FolderType = "announcements"

@Injectable()
export class FileService {

    @Inject() private readonly configService: ConfigService
    @InjectRepository(File) readonly fileRepository: Repository<File>


    async upload(user: CurrentUserProps, files: Express.Multer.File[], folder: FolderType, relationId: number) {
        const firebaseConfig = {
            apiKey: this.configService.firerbase.apiKey,
            authDomain: this.configService.firerbase.authDomain,
            storageBucket: this.configService.firerbase.storageBucket
        }
        const firebaseApp = initializeApp(firebaseConfig)
        const storage = getStorage(firebaseApp)

        const metadata = {
            contentType: 'image/jpeg',
        }

        const data = []
        for (const file in files) {
            const fileName = `${user.email}/${folder}/${files[file].originalname}-${Date.now()}`
            const storageRef = ref(storage, `${fileName}`)
            await uploadBytes(storageRef, files[file].buffer, metadata)
            data.push(this.fileRepository.create({
                path: await this.downloadUrl(storageRef),
                name: fileName,
                mimeType: files[file].mimetype,
                [folder]: { id: relationId }
            }))
        }
        return await this.fileRepository.save(data)
    }

    async downloadUrl(storageRef: StorageReference) {
        const url = getDownloadURL(ref(storageRef))
        return url
    }
}
