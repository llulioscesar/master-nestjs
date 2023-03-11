import { ApiProperty } from '@nestjs/swagger';

export class PublicationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}
