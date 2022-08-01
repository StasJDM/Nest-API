import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../shared/types/app-config.type';
import { ReturnUserDto } from '../user/dto/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (isMatchPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { id: user.id, username: user.username };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(registerUserDto: RegisterUserDto): Promise<ReturnUserDto> {
    const hashRounds = Number(this.configService.get<number>(AppConfig.HashRounds));

    const salt = await bcrypt.genSalt(hashRounds);
    const hash = await bcrypt.hash(registerUserDto.password, salt);

    const user = await this.userService.create({
      ...registerUserDto,
      password: hash,
    });

    return new ReturnUserDto(user);
  }
}
