import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { UserService } from '../../src/modules/user/user.service'
import { User } from '../../src/modules/user/entites/user.entity'
import { JwtService } from '@nestjs/jwt'
import { Conversation } from '../../src/modules/conversation/entities/conversation.entity'
import { ConversationService } from '../../src/modules/conversation/conversation.service'

describe('AuthController (e2e)', () => {
    let app: INestApplication
    let userService: UserService
    let jwtService: JwtService
    let conversationService: ConversationService



    let firstUser: User
    let secondUser: User
    let validJwt: string
    let conversation: Conversation



    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        userService = moduleFixture.get<UserService>(UserService)
        jwtService = moduleFixture.get<JwtService>(JwtService)
        jwtService = moduleFixture.get<JwtService>(JwtService)
        conversationService = moduleFixture.get<ConversationService>(ConversationService)


        app.useGlobalPipes(new ValidationPipe())
        await app.init()

        firstUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'akif',
                email: 'akifcan@yasar.edu.tr',
                schollId: 'test',
                role: 'student',
            })
        )

        secondUser = await userService.userRepository.save(
            userService.userRepository.create({
                name: 'hayaliarkadasi',
                email: 'hayaliarkadasi@yasar.edu.tr',
                schollId: 'test',
                role: 'student',
            })
        )

        conversation = await conversationService.conversationRepository.save(
            conversationService.conversationRepository.create({
                lastMessage: "how are you",
                sender: { id: firstUser.id },
                receiver: { id: secondUser.id }
            })
        )

        validJwt = jwtService.sign({ id: firstUser.id, role: firstUser.role })
    })

    afterAll(async () => {
        validJwt = ''
        await conversationService.conversationRepository.delete({ id: conversation.id })
        await userService.userRepository.delete(firstUser)
        await userService.userRepository.delete(secondUser)
    })

    describe('me conversations', () => {

        it('should be  200 when my conversations listed', async () => {
            const result = await request(app.getHttpServer()).get('/conversation/me').set({ "Authorization": `Berer ${validJwt}` }).send({})
            expect(result.statusCode).toBe(200)
        })

    })

    describe('send message', () => {

        it('should be  201 when new message sent', async () => {
            const result = await request(app.getHttpServer())
                .post(`/conversation/send-message/${secondUser.id}`)
                .set({ "Authorization": `Berer ${validJwt}` })
                .send({
                    "body": "💖 how are you today."
                })
            expect(result.statusCode).toBe(201)
        })

    })

    describe('message details', () => {

        it('should be  200 when viewed message details', async () => {
            const result = await request(app.getHttpServer())
                .get(`/conversation/conversation/${conversation.id}`)
                .set({ "Authorization": `Berer ${validJwt}` })
                .send()
            expect(result.statusCode).toBe(200)
        })

    })

})
