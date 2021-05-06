import { ApiProperty } from "@nestjs/swagger";

export class ModuleDto {
  @ApiProperty()
  name: string;
}
