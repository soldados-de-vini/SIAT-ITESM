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
  @Get(':periodId')
  @Header('Content-type', 'application/csv')
  findAll(
    @Request() req: JwtRequest,
    @Param('periodId') periodId: string,
  ): Promise<Buffer> {
    return this.exportService.createTec20Csv(req.user.id, periodId);
  }
}
