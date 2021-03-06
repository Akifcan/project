import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from '../entities/lesson.entity'
import { User } from '../modules/user/entites/user.entity'
import { Repository } from 'typeorm'
import { Schedule } from '../modules/schedule/entities/schedule.entity'
import { File } from '../modules/file/entities/file.entity'
import { Demand } from '../modules/demand/entities/demand.entity'
import { Announcement } from '../modules/announcement/entities/announcement.entity'
import { DemandConversation } from '../modules/demand/entities/demandConversation.entity'
import { DemandActivity } from '../modules/demand/entities/demandActivity.entity'
import { Post } from '../modules/post/entities/post.entity'
import { Comment } from '../modules/comment/entities/comment.entity'
import { EventPost } from '../modules/post/entities/eventPost.entity'
import { MediaPost } from '../modules/post/entities/mediaPost.entity'
import { Department } from '../entities/department.entity'
import { Conversation } from '../modules/conversation/entities/conversation.entity'
import { Notification } from '../modules/notification/entities/notification.entity'
import { Message } from '../modules/conversation/entities/message.entity'

@Injectable()
export class SeederService {
  @InjectRepository(User) private usersRepository: Repository<User>
  @InjectRepository(Lesson) lessonRepository: Repository<Lesson>
  @InjectRepository(Schedule) scheduleRepository: Repository<Schedule>
  @InjectRepository(File) fileRepository: Repository<File>
  @InjectRepository(Demand) demandRepository: Repository<Demand>
  @InjectRepository(DemandConversation) demandConversationRepository: Repository<DemandConversation>
  @InjectRepository(Announcement) announcementRepository: Repository<Announcement>
  @InjectRepository(DemandActivity) demandActivityRepository: Repository<DemandActivity>
  @InjectRepository(Post) postRepository: Repository<Post>
  @InjectRepository(Comment) commentRepository: Repository<Comment>
  @InjectRepository(EventPost) eventPostRepository: Repository<EventPost>
  @InjectRepository(MediaPost) mediaPostRepository: Repository<MediaPost>
  @InjectRepository(Department) departmentRepository: Repository<Department>
  @InjectRepository(Conversation) conversationRepository: Repository<Conversation>
  @InjectRepository(Notification) notificationRepository: Repository<Notification>
  @InjectRepository(Message) messageRepository: Repository<Message>



  async create() {

    Logger.log('Seeder!')
    await this.fileRepository.delete({})
    await this.messageRepository.delete({})
    await this.conversationRepository.delete({})
    await this.postRepository.delete({})
    await this.announcementRepository.delete({})
    await this.notificationRepository.delete({})
    await this.commentRepository.delete({})
    await this.demandConversationRepository.delete({})
    await this.demandActivityRepository.delete({})
    await this.demandRepository.delete({})
    await this.scheduleRepository.delete({})
    await this.conversationRepository.delete({})
    await this.conversationRepository.delete({})
    await this.lessonRepository.delete({})
    await this.eventPostRepository.delete({})
    await this.mediaPostRepository.delete({})
    await this.usersRepository.delete({})
    await this.departmentRepository.delete({})
    Logger.log('Available Records Removed!')



    const department1 = this.departmentRepository.create({
      nameEn: "Faculty of Architecture",
      nameTr: "Mimarl??k Fak??ltesi"
    })

    const department2 = this.departmentRepository.create({
      nameEn: "Computer Programming",
      nameTr: "Bilgisayar Programc??l??????"
    })


    const department3 = this.departmentRepository.create({
      nameEn: "Computer Engineering",
      nameTr: "Bilgisayar M??hendisli??i"
    })


    const department4 = this.departmentRepository.create({
      nameEn: "Industrial Engineering",
      nameTr: "End??stri M??hendisli??i"
    })


    const department5 = this.departmentRepository.create({
      nameEn: "Psychology",
      nameTr: "Psikoloji"
    })


    const department6 = this.departmentRepository.create({
      nameEn: "English Language and Literature",
      nameTr: "??ngiliz Dili ve Edebiyat??"
    })

    const department7 = this.departmentRepository.create({
      nameEn: "Economics",
      nameTr: "Ekonomi"
    })

    const department8 = this.departmentRepository.create({
      nameEn: "Student Affairs",
      nameTr: "????renci ????leri"
    })



    const departments = await this.departmentRepository.save(
      [
        department1,
        department2,
        department3,
        department4,
        department5,
        department6,
        department7,
        department8
      ]
    )

    const user1 = this.usersRepository.create({
      name: 'Kathryne Carratt',
      email: 'kathryne.carrat@yasar.edu.tr',
      schollId: 'kathryne.carrat',
      role: 'teacher',
      department: department1,
    })

    const user2 = this.usersRepository.create(
      {
        name: 'Kaylee Beadham',
        email: 'kaylee.beadham@yasar.edu.tr',
        schollId: 'kaylee.beadham',
        role: 'teacher',
        department: department2
      }
    )
    const user3 = this.usersRepository.create(
      {
        name: 'Nikaniki Janway',
        email: 'nikaniki.janway@yasar.edu.tr',
        schollId: 'nikaniki.janway',
        role: 'teacher',
        department: department3,
      }
    )
    const user4 = this.usersRepository.create(
      {
        name: 'Kelsi Stow',
        email: 'kelsi.stow@yasar.edu.tr',
        schollId: 'kelsi.stow',
        role: 'teacher',
        department: department4
      }

    )
    const user5 = this.usersRepository.create(
      {
        name: 'Annamarie Ca',
        email: 'annamaria.ca@yasar.edu.tr',
        schollId: 'annamarie.ca',
        role: 'moderator',
        department: department8,
      }
    )
    const user6 = this.usersRepository.create(
      {
        name: 'Seana Janeway',
        email: 'seana.janeway@stu.yasar.edu.tr',
        schollId: 'seane.janeway',
        role: 'moderator',
        department: department8,
      }
    )
    const user7 = this.usersRepository.create(
      {
        name: 'Akifcan Kara',
        email: '20100001016@stu.yasar.edu.tr',
        schollId: '2010001016',
        role: 'student',
        department: department2,
      }
    )
    const user8 = this.usersRepository.create(
      {
        name: 'Gusty Farthin',
        email: '2010001017@stu.yasar.edu.tr',
        schollId: '2010001017',
        role: 'student',
        department: department3,
      }
    )
    const user9 = this.usersRepository.create(
      {
        name: 'Jaquith Phibb',
        email: '2010001217@stu.yasar.edu.tr',
        schollId: '2010001027',
        role: 'student',
        department: department5,
      },

    )
    const user10 = this.usersRepository.create(
      {
        name: 'Lionello Dykins',
        email: '2010001018@stu.yasar.edu.tr',
        schollId: '2010001018',
        role: 'student',
        department: department6,
      },

    )
    const user11 = this.usersRepository.create(
      {
        name: 'Alexia Wybron',
        email: '2010001019@stu.yasar.edu.tr',
        schollId: '2010001019',
        role: 'student',
        department: department3,
      },

    )

    const users = await this.usersRepository.save([
      user1,
      user2,
      user3,
      user4,
      user5,
      user6,
      user7,
      user8,
      user9,
      user10,
      user11
    ])

    /*
       1,- 4 , 7 - 11
    */



    const lesson1 = this.lessonRepository.create({
      id: 1,
      name: 'B??LG?? TEKNOLOJ??LER??',
      code: 'MBBP 1100',
      users: [user1, user7, user9, user10],
    })
    const lesson2 = this.lessonRepository.create({
      id: 2,
      name: 'YAPAY ZEKA TEMELLER??',
      code: 'MBBP 1108',
      users: [user2, user8, user10, user8],

    })
    const lesson3 = this.lessonRepository.create({
      id: 3,
      name: 'G??RSEL PROGRAMLAMA I',
      code: 'MBBP 1112',
      users: [user4, user8, user9],
    })
    const lesson4 = this.lessonRepository.create({
      id: 4,
      name: 'VER?? YAPILARI VE ALGOR??TMALAR',
      code: 'MBBP 1114',
      users: [user3, user7, user8, user9],
    })
    const lesson5 = this.lessonRepository.create({
      id: 5,
      name: '??NTERNET PROGRAMLAMA',
      code: 'MBBP 1156',
      users: [user4, user10, user11, user7],
    })
    const lesson6 = this.lessonRepository.create({
      id: 6,
      name: 'MOB??L UYGULAMALAR VE TEKNOLOJ??LER',
      code: 'MBBP 2214',
      users: [user1, user8, user9, user10],
    })
    const lesson7 = this.lessonRepository.create({
      id: 7,
      name: 'S??STEM ANAL??Z?? VE TASARIMI',
      code: 'MBBP 2216',
      users: [user2, user11, user8, user7],
    })
    const lesson8 = this.lessonRepository.create({
      id: 8,
      name: 'ENGLISH I',
      code: 'SOFL 1115',
      users: [user2, user8, user7, user9],
    })
    const lesson9 = this.lessonRepository.create({
      id: 9,
      name: 'FRENCH II',
      code: 'SOFL 1032',
      users: [user3, user9, user6, user11],
    })
    const lesson10 = this.lessonRepository.create({
      id: 10,
      name: 'GENERAL',
      code: 'GFAS',
      users: [user2, user11, user10, user6],
    })


    const lessons = await this.lessonRepository.save([
      lesson1,
      lesson2,
      lesson3,
      lesson4,
      lesson5,
      lesson6,
      lesson7,
      lesson8,
      lesson9,
      lesson10
    ])

    const schedule = await this.scheduleRepository.save(
      this.scheduleRepository.create([
        {
          day: 1,
          startAt: "08:00",
          endAt: "10:00",
          lesson: lesson1,
          place: "Y319",
        },
        {
          day: 2,
          startAt: "08:00",
          endAt: "10:00",
          lesson: lesson1,
          place: "Y319",
        },
        {
          day: 3,
          startAt: "15:00",
          endAt: "20:00",
          lesson: lesson1,
          place: "Y318",
        },
        {
          day: 3,
          startAt: "09:00",
          endAt: "12:00",
          lesson: lesson2,
          place: "Y310",
        },
        {
          day: 2,
          startAt: "12:00",
          endAt: "13:00",
          lesson: lesson2,
          place: "Y310",
        },
        {
          day: 5,
          startAt: "09:00",
          endAt: "12:00",
          lesson: lesson2,
          place: "T101",
        },
        {
          day: 1,
          startAt: "11:00",
          endAt: "12:00",
          lesson: lesson3,
          place: "Y410",
        },
        {
          day: 2,
          startAt: "11:00",
          endAt: "12:00",
          lesson: lesson3,
          place: "Y410",
        },
        {
          day: 3,
          startAt: "14:00",
          endAt: "15:00",
          lesson: lesson3,
          place: "T401",
        },
        {
          day: 5,
          startAt: "15:00",
          endAt: "17:00",
          lesson: lesson4,
          place: "Y412",
        },
        {
          day: 4,
          startAt: "15:00",
          endAt: "17:00",
          lesson: lesson4,
          place: "Y412",
        },
        {
          day: 3,
          startAt: "15:00",
          endAt: "17:00",
          lesson: lesson4,
          place: "T412",
        },
        {
          day: 1,
          startAt: "15:00",
          endAt: "17:00",
          lesson: lesson5,
          place: "Y413",
        },
        {
          day: 5,
          startAt: "15:00",
          endAt: "17:00",
          lesson: lesson5,
          place: "Y413",
        },
        {
          day: 2,
          startAt: "15:00",
          endAt: "17:00",
          lesson: lesson5,
          place: "T413",
        },
        {
          day: 1,
          startAt: "18:00",
          endAt: "19:00",
          lesson: lesson6,
          place: "Y113",
        },
        {
          day: 5,
          startAt: "18:00",
          endAt: "19:00",
          lesson: lesson6,
          place: "Y113",
        },
        {
          day: 4,
          startAt: "18:00",
          endAt: "19:00",
          lesson: lesson6,
          place: "T113",
        },
        {
          day: 1,
          startAt: "18:00",
          endAt: "19:00",
          lesson: lesson6,
          place: "Y113",
        },
        {
          day: 5,
          startAt: "10:00",
          endAt: "12:00",
          lesson: lesson7,
          place: "T200",
        },
        {
          day: 5,
          startAt: "10:00",
          endAt: "12:00",
          lesson: lesson7,
          place: "Y213",
        },
        {
          day: 4,
          startAt: "10:00",
          endAt: "12:00",
          lesson: lesson7,
          place: "T200",
        },
        {
          day: 2,
          startAt: "10:00",
          endAt: "12:00",
          lesson: lesson8,
          place: "T201",
        },
        {
          day: 1,
          startAt: "10:00",
          endAt: "12:00",
          lesson: lesson8,
          place: "Y214",
        },
        {
          day: 3,
          startAt: "10:00",
          endAt: "12:00",
          lesson: lesson8,
          place: "T201",
        },
        {
          day: 2,
          startAt: "14:30",
          endAt: "16:30",
          lesson: lesson9,
          place: "X00",
        },
        {
          day: 4,
          startAt: "14:30",
          endAt: "16:30",
          lesson: lesson9,
          place: "X00",
        },
        {
          day: 1,
          startAt: "14:30",
          endAt: "16:30",
          lesson: lesson10,
          place: "X00",
        },
        {
          day: 5,
          startAt: "14:30",
          endAt: "16:30",
          lesson: lesson10,
          place: "X00",
        },

      ])
    )

    const conversation = await this.conversationRepository.save(this.conversationRepository.create([
      {
        lesson: lesson1
      },
      {
        lesson: lesson2
      },
      {
        lesson: lesson3
      },
      {
        lesson: lesson4
      },
      {
        lesson: lesson5
      },
      {
        lesson: lesson6
      },
      {
        lesson: lesson7
      },
      {
        lesson: lesson8
      },
      {
        lesson: lesson9
      },
      {
        lesson: lesson10
      },
    ]))

    return {
      conversation,
      schedule,
      lessons,
      users,
      departments
    }
  }
}
