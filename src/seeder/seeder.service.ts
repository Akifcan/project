import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/entities/lesson.entity';
import { User } from 'src/modules/user/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  @InjectRepository(User) private usersRepository: Repository<User>;
  @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>;

  async create() {
    const lesson1 = this.lessonRepository.create({
      id: 1,
      name: 'BİLGİ TEKNOLOJİLERİ',
      code: 'MBBP 1100',
    });
    const lesson2 = this.lessonRepository.create({
      id: 2,
      name: 'YAPAY ZEKA TEMELLERİ',
      code: 'MBBP 1108',
    });
    const lesson3 = this.lessonRepository.create({
      id: 3,
      name: 'GÖRSEL PROGRAMLAMA I',
      code: 'MBBP 1112',
    });
    const lesson4 = this.lessonRepository.create({
      id: 4,
      name: 'VERİ YAPILARI VE ALGORİTMALAR',
      code: 'MBBP 1114',
    });
    const lesson5 = this.lessonRepository.create({
      id: 5,
      name: 'İNTERNET PROGRAMLAMA',
      code: 'MBBP 1156',
    });
    const lesson6 = this.lessonRepository.create({
      id: 6,
      name: 'MOBİL UYGULAMALAR VE TEKNOLOJİLER',
      code: 'MBBP 2214',
    });
    const lesson7 = this.lessonRepository.create({
      id: 7,
      name: 'SİSTEM ANALİZİ VE TASARIMI',
      code: 'MBBP 2216',
    });
    const lesson8 = this.lessonRepository.create({
      id: 8,
      name: 'ENGLISH I',
      code: 'SOFL 1115',
    });
    const lesson9 = this.lessonRepository.create({
      id: 9,
      name: 'FRENCH II',
      code: 'SOFL 1032',
    });

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
    ]);

    const users = await this.usersRepository.save(
      this.usersRepository.create([
        {
          name: 'Kathryne Carratt',
          email: 'kathryne.carrat@yasar.edu.tr',
          schollId: 'kathryne.carrat',
          role: 'teacher',
        },
        {
          name: 'Kaylee Beadham',
          email: 'kaylee.beadham@yasar.edu.tr',
          schollId: 'kaylee.beadham',
          role: 'teacher',
        },
        {
          name: 'Nikaniki Janway',
          email: 'nikaniki.janway@yasar.edu.tr',
          schollId: 'nikaniki.janway',
          role: 'teacher',
        },
        {
          name: 'Kelsi Stow',
          email: 'kelsi.stow@yasar.edu.tr',
          schollId: 'kelsi.stow',
          role: 'teacher',
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
    );

    return {
      lessons,
      users,
    };
  }
}
