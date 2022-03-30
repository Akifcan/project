import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { UserService } from '../../src/modules/user/user.service'
import { User } from '../../src/modules/user/entites/user.entity'
import { JwtService } from '@nestjs/jwt'
import { SeederService } from '../../src/seeder/seeder.service'
import { Department } from " '../../src/entities/department.entity"
import { AssistantService } from '../../src/modules/assistant/assistant.service'


describe('UserController (e2e)', () => {
    let app: INestApplication
    let userService: UserService
    let jwtService: JwtService
    let seederService: SeederService
    let department: Department
    let validUser: User
    let validJwt: string
    let assistantService: AssistantService
    const elasticIndexName = "assistant-test-e2e"

    const validQuestion = "maske takmak zorunlu mu"
    const unvalidQuestion = "asf"

    beforeAll(async () => {


        process.env.ELASTICSEARCH_INDEX_ASSISTANT = elasticIndexName

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()


        app = moduleFixture.createNestApplication()
        userService = moduleFixture.get<UserService>(UserService)
        seederService = moduleFixture.get<SeederService>(SeederService)
        jwtService = moduleFixture.get<JwtService>(JwtService)
        assistantService = moduleFixture.get<AssistantService>(AssistantService)



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

        await assistantService.generateAssistant()

        validJwt = jwtService.sign({ id: validUser.id, role: validUser.role })
    })

    afterAll(async () => {
        validJwt = ''
        await userService.userRepository.delete(validUser)
        await seederService.departmentRepository.delete({ id: department.id })
        // await elasticService.deleteIndex(elasticIndexName)
    })

    describe("ask question", () => {
        it("should success keywords exists when question is valid", async () => {
            const result = await request(app.getHttpServer()).post("/assistant/ask")
                .set({ "Authorization": `Bearer ${validJwt}` })
                .send({ question: validQuestion })

            expect(result.body[0].keywords).toBeDefined()
        })
        it("should success keywords not available when question is unvalid", async () => {
            const result = await request(app.getHttpServer()).post("/assistant/ask")
                .set({ "Authorization": `Bearer ${validJwt}` })
                .send({ question: unvalidQuestion })
            expect(result.body[0].keywords).toBeUndefined()
        })

    })


})
