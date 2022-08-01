import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

export class ReturnUserDto extends User {
  @Exclude()
  deletedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
