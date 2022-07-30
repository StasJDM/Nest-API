import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrmConfig from 'ormconfig';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
