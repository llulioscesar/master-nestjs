import { ApiProperty } from '@nestjs/swagger';
import { PublicationDto } from './publication.dto';

export class ListPublicationsDto {
  @ApiProperty({
    type: [PublicationDto],
  })
  publications: PublicationDto[];

  @ApiProperty()
  last_page: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;
}
