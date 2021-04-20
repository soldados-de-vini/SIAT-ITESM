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
  Patch,
} from '@nestjs/common';
import { JwtRequest } from '../utils/interfaces/request-token';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/course.dto';
import { CreateCourseReq } from './interfaces/create-course-req.interface';
import { UpdateCourseModulesDto } from './dto/course-module.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: JwtRequest,
    @Body() createCourseData: CreateCourseReq,
  ) {
    return this.coursesService.create(createCourseData, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tec20')
  async findTec20(@Request() req: JwtRequest) {
    return this.coursesService.findTec20(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tec21')
  async findTec21(@Request() req: JwtRequest) {
    return this.coursesService.findTec21(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') courseId: string,
    @Body() updateCourseDto: CourseDto,
  ) {
    return this.coursesService.update(req.user.id, courseId, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateModules(
    @Request() req: JwtRequest,
    @Param('id') courseId: string,
    @Body() updateModulesDto: UpdateCourseModulesDto,
  ) {
    return this.coursesService.updateModules(
      req.user.id,
      courseId,
      updateModulesDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.coursesService.remove(req.user.id, id);
  }
}
