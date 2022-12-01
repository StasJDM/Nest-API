import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../shared/types/app-config.type';
import { GoogleStrategy } from './strategies/google.strategy';
import { MailSenderModule } from '../mail-sender/mail-sender.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(AppConfig.JWTSecret),
        signOptions: {
          expiresIn: configService.get(AppConfig.JWTExp),
        },
      }),
      inject: [ConfigService],
    }),
    MailSenderModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
