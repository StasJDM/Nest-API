import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '../shared/types/app-config.type';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailSenderService } from './mail-sender.service';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const transport = configService.get<string>(AppConfig.MailTransport);
        const mailFromName = configService.get<string>(AppConfig.MailFromName);
        const mailFromAddress = transport.split(':')[1].split('//')[1];

        return {
          transport,
          defaults: {
            from: `"${mailFromName}" <${mailFromAddress}>`,
          },
          template: {
            dir: path.join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {}
