import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  constructor(success: boolean) {
    this.success = success;
  }

  @ApiProperty()
  success: boolean;
}
