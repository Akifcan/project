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
import { DemandActivity } from 'src/modules/demand/entities/demandActivity.entity'
import { Post } from 'src/modules/post/entities/post.entity'
import { Comment } from 'src/modules/comment/entities/comment.entity'
import { EventPost } from 'src/modules/post/entities/eventPost.entity'
import { MediaPost } from 'src/modules/post/entities/mediaPost.entity'

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



  async create() {

    Logger.log('Seeder!')
    await this.fileRepository.delete({})
    await this.commentRepository.delete({})
    await this.eventPostRepository.delete({})
    await this.mediaPostRepository.delete({})
    await this.postRepository.delete({})
    await this.demandConversationRepository.delete({})
    await this.demandActivityRepository.delete({})
    await this.demandRepository.delete({})
    await this.announcementRepository.delete({})
    await this.scheduleRepository.delete({})
    await this.lessonRepository.delete({})
    await this.usersRepository.delete({})
    Logger.log('Available Records Removed!')
    const lesson1 = this.lessonRepository.create({
      id: 1,
      name: 'BİLGİ TEKNOLOJİLERİ',
      code: 'MBBP 1100',
    })
    const lesson2 = this.lessonRepository.create({
      id: 2,
      name: 'YAPAY ZEKA TEMELLERİ',
      code: 'MBBP 1108',
    })
    const lesson3 = this.lessonRepository.create({
      id: 3,
      name: 'GÖRSEL PROGRAMLAMA I',
      code: 'MBBP 1112',
    })
    const lesson4 = this.lessonRepository.create({
      id: 4,
      name: 'VERİ YAPILARI VE ALGORİTMALAR',
      code: 'MBBP 1114',
    })
    const lesson5 = this.lessonRepository.create({
      id: 5,
      name: 'İNTERNET PROGRAMLAMA',
      code: 'MBBP 1156',
    })
    const lesson6 = this.lessonRepository.create({
      id: 6,
      name: 'MOBİL UYGULAMALAR VE TEKNOLOJİLER',
      code: 'MBBP 2214',
    })
    const lesson7 = this.lessonRepository.create({
      id: 7,
      name: 'SİSTEM ANALİZİ VE TASARIMI',
      code: 'MBBP 2216',
    })
    const lesson8 = this.lessonRepository.create({
      id: 8,
      name: 'ENGLISH I',
      code: 'SOFL 1115',
    })
    const lesson9 = this.lessonRepository.create({
      id: 9,
      name: 'FRENCH II',
      code: 'SOFL 1032',
    })
    const lesson10 = this.lessonRepository.create({
      id: 10,
      name: 'GENERAL',
      code: 'GFAS',
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

    const users = await this.usersRepository.save(
      this.usersRepository.create([
        {
          name: 'Kathryne Carratt',
          email: 'kathryne.carrat@yasar.edu.tr',
          schollId: 'kathryne.carrat',
          role: 'teacher',
          lessons: [lesson1, lesson2]
        },
        {
          name: 'Kaylee Beadham',
          email: 'kaylee.beadham@yasar.edu.tr',
          schollId: 'kaylee.beadham',
          role: 'teacher',
          lessons: [lesson7, lesson5]
        },
        {
          name: 'Nikaniki Janway',
          email: 'nikaniki.janway@yasar.edu.tr',
          schollId: 'nikaniki.janway',
          role: 'teacher',
          lessons: [lesson9, lesson10]
        },
        {
          name: 'Kelsi Stow',
          email: 'kelsi.stow@yasar.edu.tr',
          schollId: 'kelsi.stow',
          role: 'teacher',
          lessons: [lesson2, lesson9]
        },
        {
          name: 'Annamarie Ca',
          email: 'annamaria.ca@yasar.edu.tr',
          schollId: 'annamarie.ca',
          role: 'moderator',
        },
        {
          name: 'Seana Janeway',
          email: 'seana.janeway@stu.yasar.edu.tr',
          schollId: 'seane.janeway',
          role: 'moderator',
        },
        {
          name: 'Akifcan Kara',
          email: '20100001016@stu.yasar.edu.tr',
          schollId: '2010001016',
          role: 'student',
          lessons: [lesson9, lesson2, lesson3],
        },
        {
          name: 'Gusty Farthin',
          email: '2010001017@stu.yasar.edu.tr',
          schollId: '2010001017',
          role: 'student',
          lessons: [lesson1, lesson5, lesson2],
        },
        {
          name: 'Jaquith Phibb',
          email: '2010001217@stu.yasar.edu.tr',
          schollId: '2010001027',
          role: 'student',
          lessons: [lesson1, lesson4, lesson2],
        },
        {
          name: 'Lionello Dykins',
          email: '2010001018@stu.yasar.edu.tr',
          schollId: '2010001018',
          role: 'student',
          lessons: [lesson6, lesson7, lesson8],
        },
        {
          name: 'Alexia Wybron',
          email: '2010001019@stu.yasar.edu.tr',
          schollId: '2010001019',
          role: 'student',
          lessons: [lesson3, lesson2, lesson9],
        },
      ]),
    )

    return {
      schedule,
      lessons,
      users,
    }
  }
}
