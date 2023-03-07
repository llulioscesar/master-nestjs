import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty()
  user: UserDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  expire_token: string;
}
