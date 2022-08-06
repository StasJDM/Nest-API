import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AppConfig } from 'src/modules/shared/types/app-config.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>(AppConfig.GoogleClientID);
    const clientSecret = configService.get<string>(AppConfig.GoogleSecret);
    const callbackURL = configService.get<string>(AppConfig.GoogleCallbackUrl);

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, username } = profile;
    const user = {
      username,
      name: name.givenName,
      surname: name.familyName,
    };

    done(null, user);
  }
}
