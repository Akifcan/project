import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { AuthService } from '../../src/modules/auth/auth.service'

describe('AppController (e2e)', () => {
    let app: INestApplication
    let authService: AuthService


    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        authService = moduleFixture.get<AuthService>(AuthService)
        await app.init()
    })

    it('/ (GET)', () =>
        request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'))
})
