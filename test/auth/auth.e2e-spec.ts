import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { UserService } from '../../src/modules/user/user.service'
import { User } from '../../src/modules/user/entites/user.entity'
import { JwtService } from '@nestjs/jwt'

describe('AuthController (e2e)', () => {
    let app: INestApplication
    let userService: UserService
    let jwtService: JwtService


    let validUser: User
    let validJwt: string

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        userService = moduleFixture.get<UserService>(UserService)
        jwtService = moduleFixture.get<JwtService>(JwtService)

        app.useGlobalPipes(new ValidationPipe())
        await app.init()

        validUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'test',
                email: 'test@yasar.edu.tr',
                schollId: 'test',
                role: 'student',
            })
        )

        validJwt = jwtService.sign({ id: validUser.id, role: validUser.role })
    })

    afterAll(async () => {
        validJwt = ''
        await userService.userRepository.delete(validUser)
    })

    describe('validation', () => {
        it('should be return 400 when validation failed', (done) => {
            request(app.getHttpServer()).post('/auth/sign-in').send({}).expect(400).end(done)
        })
    })

    describe('jwt', () => {
        it('should be return 202 when jwt valid', (done) => {
            request(app.getHttpServer()).post('/auth/validate').send({ token: validJwt }).expect(202).end(done)
        })
        it('should be return 400 when jwt is not valid', (done) => {
            request(app.getHttpServer()).post('/auth/validate').send({ token: 'fasdf' }).expect(400).end(done)
        })

    })

    describe('sign-in', () => {

        const unauthorizedUser = {
            "email": "seana.janeway@stu.yasar.ed.tr",
            "password": "12345"
        }

        it('should be return 200 when sign in success', (done) => {
            request(app.getHttpServer()).post('/auth/sign-in').send({
                email: validUser.email,
                password: validUser.password
            }).expect(202).end(done)
        })

        it('should be return 401 when user is unauthorized', (done) => {
            request(app.getHttpServer()).post('/auth/sign-in').send({
                email: unauthorizedUser.email,
                password: unauthorizedUser.password
            }).expect(401).end(done)
        })


    })

})
