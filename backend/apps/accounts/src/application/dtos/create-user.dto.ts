import { IsEmail, IsString, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmpty()
  @ApiProperty({
    nullable: false,
    description: 'Username of the user',
  })
  username: string;

  @IsEmail()
  @IsEmpty()
  @ApiProperty({
    nullable: false,
    format: 'email',
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @IsEmpty()
  @ApiProperty({
    nullable: false,
    format: 'password',
    description: 'Password of the user',
  })
  password: string;

  @IsString()
  @ApiProperty({
    nullable: false,
    description: 'Role of the user',
  })
  role: string;

  @IsString()
  @IsEmpty()
  @ApiProperty({
    nullable: false,
    description: 'First name of the user',
  })
  first_name: string;

  @IsString()
  @IsEmpty()
  @ApiProperty({
    nullable: false,
    description: 'Last name of the user',
  })
  last_name: string;
}
