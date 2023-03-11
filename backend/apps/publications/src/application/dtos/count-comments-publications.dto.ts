import { ApiProperty } from '@nestjs/swagger';

export class CountCommentsPublicationsDto {
  @ApiProperty()
  publication_id: string;

  @ApiProperty()
  count: number;
}
