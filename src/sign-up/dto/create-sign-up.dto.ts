import { Column } from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSignUpDto {



  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password: string;
}
