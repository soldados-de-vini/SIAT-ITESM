import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateModuleGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty()
  @IsNotEmpty()
  moduleId: string[];
}
