import {
  Controller,
  Get,
  UseGuards,
  Request,
  Header,
  Param,
} from '@nestjs/common';
import { JwtRequest } from '../utils/interfaces/request-token';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tec20/:periodId')
  @Header('Content-type', 'application/csv')
  csvTec20(
    @Request() req: JwtRequest,
    @Param('periodId') periodId: string,
  ): Promise<Buffer> {
    return this.exportService.createTec20Csv(req.user.id, periodId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tec21/:periodId')
  @Header('Content-type', 'application/csv')
  csvTec21(
    @Request() req: JwtRequest,
    @Param('periodId') periodId: string,
  ): Promise<Buffer> {
    return this.exportService.createTec21Csv(req.user.id, periodId);
  }
}
