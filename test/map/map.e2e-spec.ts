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

    const validPlace = { "lat": 27.202180655030872, "long": 38.45475776018443 }
    const unvalidPlace = { "lat": 27.202180655030872, "long": 434343 }

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

    describe('valid place', () => {

        it('should be  success equal to true when place is found', async () => {
            const result = await request(app.getHttpServer()).post('/map/reverse').set({ "Authorization": `Berer ${validJwt}` }).send(validPlace)
            expect(result.body.success).toBe(true)
        })

    })

    describe('unvalid place', () => {

        it('should be success equal to false when place is not found', async () => {
            const result = await request(app.getHttpServer()).post('/map/reverse').set({ "Authorization": `Berer ${validJwt}` }).send(unvalidPlace)
            expect(result.body.success).toBe(false)
        })

    })


})
