import { User } from '../user/entities/user.entity';

export interface Token {
  accessToken: string;
}

export interface AppRequest extends Request {
  user: User;
}
