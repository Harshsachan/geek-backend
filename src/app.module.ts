import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SignUpEntity } from './sign-up/entities/sign-up.entity';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mongodb',
    url:process.env.MONGODB_URI,
    synchronize:false,
    useUnifiedTopology:true,
    entities:[SignUpEntity]
  }),SignUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
