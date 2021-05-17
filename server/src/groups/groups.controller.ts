import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupReq } from './interfaces/create-group.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../utils/interfaces/request-token';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEventDataDto } from './dto/group-event.dto';

@ApiBearerAuth('access-token')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() jwt: JwtRequest, @Body() createReq: CreateGroupReq) {
    return this.groupsService.createGroup(createReq, jwt.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('period/:id')
  find(@Param('id') id: string) {
    return this.groupsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('period/:periodId/course/:courseId')
  findOne(
    @Param('periodId') periodId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.groupsService.findOne(periodId, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/event')
  findEvents(@Param('id') id: string) {
    return this.groupsService.getEvents(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() groupData: UpdateGroupDto) {
    return this.groupsService.update(id, groupData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/event')
  assignEvent(
    @Param('id') id: string,
    @Body() groupEventData: GroupEventDataDto,
  ) {
    return this.groupsService.assignEvent(id, groupEventData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':groupId/event/:eventId')
  removeEvent(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.groupsService.removeEvent(groupId, eventId);
  }
}
