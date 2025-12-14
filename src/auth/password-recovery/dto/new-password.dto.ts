import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 6 characters long.' })
  password: string;
}
