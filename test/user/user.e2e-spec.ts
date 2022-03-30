import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { UserService } from '../../src/modules/user/user.service'
import { User } from '../../src/modules/user/entites/user.entity'
import { JwtService } from '@nestjs/jwt'
import { SeederService } from '../../src/seeder/seeder.service'
import { Department } from " '../../src/entities/department.entity"
import { Lesson } from '../../src/entities/lesson.entity'


describe('UserController (e2e)', () => {
    let app: INestApplication
    let userService: UserService
    let jwtService: JwtService
    let seederService: SeederService
    let department: Department
    let validUser: User
    let validJwt: string
    let lesson: Lesson

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        userService = moduleFixture.get<UserService>(UserService)
        seederService = moduleFixture.get<SeederService>(SeederService)
        jwtService = moduleFixture.get<JwtService>(JwtService)

        app.useGlobalPipes(new ValidationPipe())
        await app.init()

        department = await seederService.departmentRepository.save(
            seederService.departmentRepository.create({
                nameTr: "demo",
                nameEn: "demo"
            })
        )

        validUser = await userService.userRepository.save(
            userService.userRepository.create({
                department,
                name: 'test',
                email: 'test@yasar.edu.tr',
                schollId: 'test',
                role: 'student',
            })
        )

        lesson = await seederService.lessonRepository.save(seederService.lessonRepository.create({
            id: 99999,
            name: "Test class",
            code: "tst",
            users: [validUser]
        }))


        validJwt = jwtService.sign({ id: validUser.id, role: validUser.role })
    })

    afterAll(async () => {
        validJwt = ''
        await userService.userRepository.delete(validUser)
        await seederService.departmentRepository.delete({ id: department.id })
        await seederService.lessonRepository.delete({ id: lesson.id })
    })

    describe('current user', () => {
        it("should return 200 when user informations list", async () => {
            const result = await request(app.getHttpServer()).get(`/user/me`)
                .set({ "Authorization": `Bearer ${validJwt}` })
                .send({})

            expect(result.statusCode).toBe(200)

        })

    })

    describe("profile", () => {
        it("should return 200 when a profile viewed", async () => {
            const result = await request(app.getHttpServer()).get(`/user/profile/${validUser.id}`)
                .set({ "Authorization": `Bearer ${validJwt}` })
                .send({})

            expect(result.statusCode).toBe(200)
        })
    })

    describe("rosters", () => {
        it("should return 200 when lesson of rosters viewed", async () => {
            const result = await request(app.getHttpServer()).get(`/user/lessons/rosters/all/${lesson.id}`)
                .set({ "Authorization": `Bearer ${validJwt}` })
                .send({})
            expect(result.statusCode).toBe(200)
        })
    })


})
