import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueModulesService.remove(id);
  }
}
