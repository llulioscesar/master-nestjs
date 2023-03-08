import { ApiProperty } from '@nestjs/swagger';

export class UsersnamesDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}
