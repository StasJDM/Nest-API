import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

export class ReturnUserDto extends OmitType(User, ['deletedAt', 'password']) {
  @Exclude()
  deletedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
