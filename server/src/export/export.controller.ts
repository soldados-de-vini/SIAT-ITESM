import { Controller, Get, Header, Param } from '@nestjs/common';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('tec20/:userId/period/:periodId')
  @Header('Content-type', 'application/csv')
  @Header('Content-Disposition', 'attachment; filename=tec20.csv')
  csvTec20(
    @Param('periodId') periodId: string,
    @Param('userId') userId: string,
  ): Promise<Buffer> {
    return this.exportService.createTec20Csv(userId, periodId);
  }

  @Get('tec21/:userId/period/:periodId')
  @Header('Content-type', 'application/csv')
  @Header('Content-Disposition', 'attachment; filename=tec21.csv')
  csvTec21(
    @Param('periodId') periodId: string,
    @Param('userId') userId: string,
  ): Promise<Buffer> {
    return this.exportService.createTec21Csv(userId, periodId);
  }
}
