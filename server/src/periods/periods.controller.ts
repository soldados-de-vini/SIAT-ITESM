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
import { PeriodsService } from './periods.service';
import { CreatePeriodsReq } from './interfaces/create-period.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../utils/interfaces/request-token';
import { PeriodDto } from './dto/period.dto';

@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: JwtRequest, @Body() createDto: CreatePeriodsReq) {
    return this.periodsService.create(createDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: JwtRequest) {
    return this.periodsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') id: string,
    @Body() periodDto: PeriodDto,
  ) {
    return this.periodsService.update(req.user.id, id, periodDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.periodsService.remove(req.user.id, id);
  }
}
