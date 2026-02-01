import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMembershipDto: CreateMembershipDto) {
    return this.prisma.membership.create({
      data: {
        ...createMembershipDto,
        startDate: new Date(createMembershipDto.startDate),
        endDate: new Date(createMembershipDto.endDate),
      },
    });
  }

  findAll() {
    return this.prisma.membership.findMany({
      include: { user: true },
    });
  }

  findOne(id: number) {
    return this.prisma.membership.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateMembershipDto: UpdateMembershipDto) {
    const { startDate, endDate, ...rest } = updateMembershipDto;
    const data: Prisma.MembershipUpdateInput = {
      ...rest,
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate && { endDate: new Date(endDate) }),
    };

    return this.prisma.membership.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.membership.delete({
      where: { id },
    });
  }
}
