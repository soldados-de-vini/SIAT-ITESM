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
import { GroupDto } from '../groups/dto/group.dto';
import { BloqueGroupsService } from './bloque-groups.service';
import { CreateBloqueGroupReq } from './interfaces/create-req-group.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('groups21')
export class BloqueGroupsController {
  constructor(private readonly bloqueGroupsService: BloqueGroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() jwt: JwtRequest, @Body() groupDto: CreateBloqueGroupReq) {
    return this.bloqueGroupsService.create(groupDto, jwt.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(@Param('id') periodId: string) {
    return this.bloqueGroupsService.findAll(periodId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloqueGroupDto: GroupDto) {
    return this.bloqueGroupsService.update(id, updateBloqueGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueGroupsService.remove(id);
  }
}
