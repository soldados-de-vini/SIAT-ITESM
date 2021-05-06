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
import { CoursesService } from './courses.service';
import { Course20Dto } from './dto/course20.dto';
import { CreateCourseReq } from './interfaces/create-course-req.interface';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('courses20')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'Create a new course 20'})
  async create(
    @Request() req: JwtRequest,
    @Body() createCourseData: CreateCourseReq,
  ) {
    return this.coursesService.create(createCourseData, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: JwtRequest) {
    return this.coursesService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') courseId: string,
    @Body() updateCourseDto: Course20Dto,
  ) {
    return this.coursesService.update(req.user.id, courseId, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.coursesService.remove(req.user.id, id);
  }
}
