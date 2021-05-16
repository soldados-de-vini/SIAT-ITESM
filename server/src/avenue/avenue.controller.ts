import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AvenueService } from './avenue.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAvenueReq } from './interface/create-avenue.interface';
import { JwtRequest } from '../utils/interfaces/request-token';
import { AvenueDto } from './dto/avenue.dto';

@ApiBearerAuth('access-token')
@Controller('avenues')
export class AvenueController {
  constructor(private readonly avenueService: AvenueService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: JwtRequest, @Body() avenueReq: CreateAvenueReq) {
    return this.avenueService.create(avenueReq, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: JwtRequest) {
    return this.avenueService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: JwtRequest,
    @Param('id') id: string,
    @Body() avenueDto: AvenueDto,
  ) {
    return this.avenueService.update(req.user.id, id, avenueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: JwtRequest, @Param('id') id: string) {
    return this.avenueService.remove(req.user.id, id);
  }
}
