import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePublicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
