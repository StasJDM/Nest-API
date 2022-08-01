import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppRequest } from '../shared/types/app-request.type';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokenDto } from './dto/token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    type: TokenDto,
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: AppRequest): Promise<TokenDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Register',
  })
  @ApiBody({
    type: RegisterUserDto,
  })
  @ApiResponse({
    type: ReturnUserDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }
}
