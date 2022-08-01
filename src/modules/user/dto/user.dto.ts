import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID, MinLength } from 'class-validator';
import { Gender } from '../enums';

export class UserDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  dateOfBirth: string;
}
