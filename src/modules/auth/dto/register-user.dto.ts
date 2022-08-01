import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class RegisterUserDto extends PickType(UserDto, [
  'name',
  'surname',
  'username',
  'password',
  'gender',
  'dateOfBirth',
]) {}
