import { OmitType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class LoginDto extends OmitType(UserDto, ['username', 'password']) {}
