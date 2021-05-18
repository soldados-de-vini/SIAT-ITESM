import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GroupEventDataDto } from '../groups/dto/group-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BloqueModulesService } from './bloque-modules.service';
import { CreateModuleGroupDto } from './dto/bloque-module.dto';

@ApiBearerAuth('access-token')
@Controller('module-groups')
export class BloqueModulesController {
  constructor(private readonly bloqueModulesService: BloqueModulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() moduleGroupDto: CreateModuleGroupDto) {
    return this.bloqueModulesService.create(
      moduleGroupDto.groupId,
      moduleGroupDto.moduleId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(@Param('id') groupId: string) {
    return this.bloqueModulesService.findWithGroup(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/event')
  findEvents(@Param('id') id: string) {
    return this.bloqueModulesService.getEvents(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/event')
  assignEvent(
    @Param('id') id: string,
    @Body() groupEventData: GroupEventDataDto,
  ) {
    return this.bloqueModulesService.assignEvent(id, groupEventData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueModulesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':groupId/event/:eventId')
  removeEvent(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.bloqueModulesService.removeEvent(groupId, eventId);
  }
}
