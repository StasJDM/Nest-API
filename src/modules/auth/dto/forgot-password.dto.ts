import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class ForgotPasswordDto extends PickType(UserDto, ['email']) {}
