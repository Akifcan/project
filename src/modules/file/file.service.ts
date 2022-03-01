import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"


import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from 'src/config/config.service'
import CurrentUserProps from "../auth/interface/currenetUser.interface"

export type FolderType = "announcements"

@Injectable()
export class FileService {

    @Inject() private readonly configService: ConfigService

    async upload(user: CurrentUserProps, files: Express.Multer.File[], folder: FolderType) {
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

        for (const file in files) {
            const storageRef = ref(storage, `${user.email}/${folder}/${files[file].originalname}-${Date.now()}`)
            await uploadBytes(storageRef, files[file].buffer, metadata)
        }
        return "ok"
    }
}
