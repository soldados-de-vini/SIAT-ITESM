import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BloqueModulesService } from './bloque-modules.service';
import { CreateBloqueModuleDto } from './dto/bloque-module.dto';

@ApiBearerAuth('access-token')
@Controller('bloque-modules')
export class BloqueModulesController {
  constructor(private readonly bloqueModulesService: BloqueModulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBloqueModuleDto: CreateBloqueModuleDto) {
    return this.bloqueModulesService.create(createBloqueModuleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.bloqueModulesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloqueModuleDto: CreateBloqueModuleDto) {
    return this.bloqueModulesService.update(+id, updateBloqueModuleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueModulesService.remove(+id);
  }
}
