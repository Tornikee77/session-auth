import { UserService } from '@/user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthMethod } from '@prisma/__generated__';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}
  public async register(dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);
    if (isExists) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );
    return this.saveSession(newUser);
  }

  public async login() {}

  public async logout() {}

  public async saveSession(user) {
    console.log(user);
  }
}
