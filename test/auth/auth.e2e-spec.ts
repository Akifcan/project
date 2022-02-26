import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { AuthService } from '../../src/modules/auth/auth.service'
import { UserService } from '../../src/modules/user/user.service'
import { User } from '../../src/modules/user/entites/user.entity'

describe('AppController (e2e)', () => {
    let app: INestApplication
    let authService: AuthService
    let userService: UserService

    let validUser: User

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        authService = moduleFixture.get<AuthService>(AuthService)
        userService = moduleFixture.get<UserService>(UserService)

        await app.init()

        validUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'test',
                email: 'test@yasar.edu.tr',
                schollId: 'test',
                role: 'student',
            })
        )


    })

    afterAll(async () => {
        await userService.userRepository.delete(validUser)
    })


    describe('sign-in', () => {

        it('should be return 200 when sign in succss', () => {
            request(app.getHttpServer()).post('/auth/sign-in').send({
                email: validUser.email,
                password: validUser.password
            }).expect(200)
        })

    })

    // it('/ (GET)', () =>
    //     request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'))
})
