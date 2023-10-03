import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { SignUpEntity } from './entities/sign-up.entity';

@Controller('signUp')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  async signup(@Body() createSignUpDto: CreateSignUpDto) {
    // Implement your signup logic here
    return await this.signUpService.createUser(createSignUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logIn')
  async findOne(@Body() { email, password }: Pick<CreateSignUpDto, 'email' | 'password'>):Promise<SignUpEntity|undefined>
    {
      const createSignUpDto: CreateSignUpDto = { email, password, name: 'DefaultName' };
        return this.signUpService.signIn(createSignUpDto);
    }
}