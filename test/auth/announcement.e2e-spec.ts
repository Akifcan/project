import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { UserService } from '../../src/modules/user/user.service'
import { User } from '../../src/modules/user/entites/user.entity'
import { JwtService } from '@nestjs/jwt'
import { AnnouncementService } from '../../src/modules/announcement/announcement.service'

describe('AnnouncementController (e2e)', () => {
    let app: INestApplication
    let userService: UserService
    let announcementService: AnnouncementService

    let jwtService: JwtService

    let validTeacherUser: User
    let validModeratorUser: User
    let unvalidUser: User

    let validTeacherJwt: string
    let validModeratorJwt: string
    let unvalidUserJwt: string
    let createdAnnouncementId = 0

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        userService = moduleFixture.get<UserService>(UserService)
        announcementService = moduleFixture.get<AnnouncementService>(AnnouncementService)
        jwtService = moduleFixture.get<JwtService>(JwtService)

        app.useGlobalPipes(new ValidationPipe())
        await app.init()

        validTeacherUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'test',
                email: 'test@yasar.edu.tr',
                schollId: 'test',
                role: 'teacher',
            })
        )

        validModeratorUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'test with moderator role',
                email: 'testmoderator@yasar.edu.tr',
                schollId: 'test',
                role: 'moderator',
            })
        )

        unvalidUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'test with student role',
                email: 'teststudentrole@yasar.edu.tr',
                schollId: 'test',
                role: 'student',
            })
        )

        validTeacherJwt = jwtService.sign({ id: validTeacherUser.id, role: validTeacherUser.role, email: validTeacherUser.email })
        validModeratorJwt = jwtService.sign({ id: validModeratorUser.id, role: validModeratorUser.role, email: validModeratorUser.email })
        unvalidUserJwt = jwtService.sign({ id: unvalidUser.id, role: unvalidUser.role, email: unvalidUser.email })


    })

    afterAll(async () => {
        validTeacherJwt = ''
        validModeratorJwt = ''
        await userService.userRepository.delete(validTeacherUser)
        await userService.userRepository.delete(validModeratorUser)
        await userService.userRepository.delete(unvalidUser)

    })

    describe("list", () => {
        it('should be return 200 when announcement listed successfully', async () => {
            const result = await request(app.getHttpServer()).get('/announcement')
                .set({ "Authorization": `Bearer ${unvalidUserJwt}` })
                .send({})
            expect(result.statusCode).toBe(200)
        })
    })

    describe("validation", () => {
        it('should be return 400 when form is not valid', async () => {
            const result = await request(app.getHttpServer()).post('/announcement/for-lesson')
                .set({ "Authorization": `Bearer ${validTeacherJwt}` })
                .send({})
            expect(result.statusCode).toBe(400)
        })
    })

    describe("role control", () => {
        it('should be return 401 when student attempt to create announcement', async () => {
            const result = await request(app.getHttpServer()).post('/announcement/for-lesson')
                .set({ "Authorization": `Bearer ${unvalidUserJwt}` })
                .send({
                    "id": "3",
                    title: "About today class",
                    content: "Today's class will be start at 14:00",
                })
            expect(result.statusCode).toBe(401)
        })
    })

    describe('create', () => {

        afterEach(async () => {
            await announcementService.announcementRepository.delete({ id: createdAnnouncementId })
        })

        it('should be return 201 when announcement for lesson created successfully', async () => {
            const result = await request(app.getHttpServer()).post('/announcement/for-lesson')
                .set({ "Authorization": `Bearer ${validTeacherJwt}` })
                .send({
                    "id": "3",
                    title: "About today class",
                    content: "Today's class will be start at 14:00",
                })
            createdAnnouncementId = result.body.announcement.id
            expect(result.statusCode).toBe(201)
        })

        it('should be return 201 when announcement for general created successfully', async () => {
            const result = await request(app.getHttpServer()).post('/announcement/for-general')
                .set({ "Authorization": `Bearer ${validModeratorJwt}` })
                .send({
                    title: "About today class",
                    content: "Today's class will be start at 14:00",
                })
            createdAnnouncementId = result.body.announcement.id
            expect(result.statusCode).toBe(201)
        })

    })

})
