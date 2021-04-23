import { PeriodDto } from '../../periods/dto/period.dto';

const mockPeriodDto = new PeriodDto();
mockPeriodDto.name = 'Test';
mockPeriodDto.startDate = '2022-11-22';
mockPeriodDto.endDate = '2022-11-24';
mockPeriodDto.vacations = ['2022-11-23'];

export { mockPeriodDto };
