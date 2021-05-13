import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtRequest } from '../utils/interfaces/request-token';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BloqueGroupsService } from './bloque-groups.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateGroupDto } from '../groups/dto/update-group.dto';
import { CreateGroupReq } from '../groups/interfaces/create-group.interface';

@ApiBearerAuth('access-token')
@Controller('groups21')
export class BloqueGroupsController {
  constructor(private readonly bloqueGroupsService: BloqueGroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() jwt: JwtRequest, @Body() createReq: CreateGroupReq) {
    return this.bloqueGroupsService.create(createReq, jwt.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('period/:id')
  find(@Param('id') id: string) {
    return this.bloqueGroupsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('period/:periodId/course/:courseId')
  findOne(@Param('periodId') periodId: string, @Param('courseId') courseId: string) {
    return this.bloqueGroupsService.findOne(periodId, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateGroupDto) {
    return this.bloqueGroupsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueGroupsService.remove(id);
  }
}
