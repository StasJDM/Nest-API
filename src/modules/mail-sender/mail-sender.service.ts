import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { User } from '../user/entities/user.entity';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendForgotPasswordMessage(user: User): Promise<void> {
    const recoveryPasswordUrl = 'http://localhost:3000';

    return await this.mailerService.sendMail({
      to: user.email,
      subject: 'Восстановление пароля',
      template: './forgot-password',
      context: {
        username: user.username,
        recoveryPasswordUrl,
      },
    });
  }
}
