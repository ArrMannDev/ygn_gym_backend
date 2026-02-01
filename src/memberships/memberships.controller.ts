import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@ApiTags('memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new membership' })
  @ApiResponse({ status: 201, description: 'Membership created successfully' })
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all memberships' })
  @ApiResponse({ status: 200, description: 'Returns all memberships' })
  findAll() {
    return this.membershipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a membership by ID' })
  @ApiResponse({ status: 200, description: 'Returns the membership' })
  findOne(@Param('id') id: string) {
    return this.membershipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a membership' })
  @ApiResponse({ status: 200, description: 'Membership updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipsService.update(+id, updateMembershipDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a membership' })
  @ApiResponse({ status: 200, description: 'Membership deleted successfully' })
  remove(@Param('id') id: string) {
    return this.membershipsService.remove(+id);
  }
}
