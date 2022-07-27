import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrmConfig from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
