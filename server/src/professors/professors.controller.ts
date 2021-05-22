import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorsReq } from './interfaces/createProfessorsReq';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../utils/interfaces/request-token';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AvailableReq } from './interfaces/availableReq.interface';

@ApiBearerAuth('access-token')
@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: JwtRequest, @Body() createReq: CreateProfessorsReq) {
    return this.professorsService.create(createReq, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: JwtRequest) {
    return this.professorsService.findAll(req.user.id);
  }

  /** A POST is not ideal, an alternative could be query parameters. */
  @UseGuards(JwtAuthGuard)
  @Post('remaining')
  findAvailable(@Request() req: JwtRequest, @Body() info: AvailableReq) {
    return this.professorsService.findAvailable(req.user.id, info);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.professorsService.update(req.user.id, id, updateProfessorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.professorsService.remove(req.user.id, id);
  }
}
