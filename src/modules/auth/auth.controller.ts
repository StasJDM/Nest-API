import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppRequest } from '../shared/types/app-request.type';
import { ResultDto } from '../shared/dto/result.dto';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokenDto } from './dto/token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { RestorePasswordDto } from './dto/restore-password.dto';

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

  @ApiOperation({
    summary: 'Change password',
  })
  @ApiBody({
    type: ChangePasswordDto,
  })
  @ApiResponse({
    type: ResultDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: AppRequest,
  ): Promise<ResultDto> {
    const { id } = req.user;
    return this.authService.changePassword(id, changePasswordDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards()
  async googleAuthRedirect(@Req() req: AppRequest): Promise<ReturnUserDto> {
    return this.authService.googleLogin(req);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<ResultDto> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('restore/:token')
  async restorePassword(
    @Param() token: string,
    @Body() restorePasswordDto: RestorePasswordDto,
  ): Promise<ResultDto> {
    return this.authService.restorePassword(token, restorePasswordDto);
  }
}
