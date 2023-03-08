import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    description: 'Username of the user',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    format: 'email',
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    description: 'First name of the user',
  })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    description: 'Last name of the user',
  })
  last_name: string;
}
