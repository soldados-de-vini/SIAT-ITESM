import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { JwtRequest } from '../utils/interfaces/request-token';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomsReq } from './interfaces/create-classrooms-req.interface';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: JwtRequest, @Body() createReq: CreateClassroomsReq) {
    return this.classroomsService.create(createReq, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: JwtRequest) {
    return this.classroomsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':classroomId/period/:periodId/events')
  findGroups(
    @Param('classroomId') classroomId: string,
    @Param('periodId') periodId: string,
  ) {
    return this.classroomsService.findEvents(classroomId, periodId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') id: string,
    @Body() updateDto: UpdateClassroomDto,
  ) {
    return this.classroomsService.update(req.user.id, id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.classroomsService.remove(req.user.id, id);
  }
}
