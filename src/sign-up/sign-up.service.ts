import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';
import { SignUpEntity } from './entities/sign-up.entity';

@Injectable()
export class SignUpService {
  constructor(@InjectRepository(SignUpEntity) private signUpRepositry:Repository<SignUpEntity>,
  ) {}
  async createUser(createSignUpDto: CreateSignUpDto): Promise<SignUpEntity> {
    const {email}=createSignUpDto;
    const userCheck = await this.signUpRepositry.findOne({where:{email}});
    if(userCheck){
      throw new HttpException("User with this email already exist",HttpStatus.NOT_FOUND);
    }
    try{
      const user = this.signUpRepositry.create(createSignUpDto);
      return await this.signUpRepositry.save(user);
    }
    catch(error)
    {
      throw new HttpException(error?.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  
  }

  async signIn(createSignUpDto: CreateSignUpDto):Promise<SignUpEntity|undefined>{
    const {email,password}=createSignUpDto;
    const user= await this.signUpRepositry.findOne({where:{email}});
    if(!user){
      throw new HttpException("User with this email Not found",HttpStatus.NOT_FOUND)
    }

    console.log(user);
    
    if(user?.password !== password){
      throw new UnauthorizedException();
    }

    return await user;

    // const { password, ...result } = user;
    // return result;

    // Stating what all will be there in our JWT Token 
    // const payload={ sub:user.email,username:user.email,roles:user.roles}
    // return {
    //   access_token: await this.jwtService.signAsync(payload)
    // }
   }
}
