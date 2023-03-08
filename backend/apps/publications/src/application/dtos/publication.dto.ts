import { ApiProperty } from '@nestjs/swagger';

export class PublicationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  user_id: string;
}
