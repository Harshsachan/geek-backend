import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mongodb',
    url:process.env.MONGODB_URI,
    synchronize:false,
    useUnifiedTopology:true,
    entities:[]
  }),SignUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
