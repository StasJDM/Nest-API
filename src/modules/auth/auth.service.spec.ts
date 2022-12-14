import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByUsernameOrEmail: jest.fn(() => new User()),
            findById: jest.fn(() => new User()),
            create: jest.fn(() => new User()),
            update: jest.fn(() => new User()),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'access-token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'config-str'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
