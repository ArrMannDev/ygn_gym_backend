import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClassDto: CreateClassDto) {
    return this.prisma.class.create({
      data: {
        ...createClassDto,
        schedule: new Date(createClassDto.schedule),
      },
    });
  }

  findAll() {
    return this.prisma.class.findMany({
      include: { trainer: true },
    });
  }

  findOne(id: number) {
    return this.prisma.class.findUnique({
      where: { id },
      include: { trainer: true },
    });
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    const { schedule, ...rest } = updateClassDto;
    const data: Prisma.ClassUpdateInput = {
      ...rest,
      ...(schedule && { schedule: new Date(schedule) }),
    };

    return this.prisma.class.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.class.delete({
      where: { id },
    });
  }
}
