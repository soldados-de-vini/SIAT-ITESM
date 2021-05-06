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
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../utils/interfaces/request-token';
import { Courses21Service } from './courses21.service';
import { Course21Dto } from './dto/course21.dto';
import { CreateCourse21Req } from './interfaces/create-courses21-req.interface';

@ApiBearerAuth('access-token')
@Controller('courses21')
export class Courses21Controller {
  constructor(private readonly courses21Service: Courses21Service) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: JwtRequest,
    @Body() createCourseData: CreateCourse21Req,
  ) {
    return this.courses21Service.create(createCourseData, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: JwtRequest) {
    return this.courses21Service.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') courseId: string,
    @Body() courseDto: Course21Dto,
  ) {
    return this.courses21Service.update(req.user.id, courseId, courseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.courses21Service.remove(req.user.id, id);
  }
}
