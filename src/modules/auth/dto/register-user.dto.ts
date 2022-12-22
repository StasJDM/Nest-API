import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class RegisterUserDto extends PickType(UserDto, ['email', 'username', 'password']) {}
