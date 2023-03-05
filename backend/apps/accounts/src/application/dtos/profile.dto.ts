import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  user_id: string;
}
