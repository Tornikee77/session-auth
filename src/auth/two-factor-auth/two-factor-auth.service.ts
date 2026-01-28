import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenType } from '@prisma/__generated__';

import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TwoFactorAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  // 1. validation token
  private async validateTwoFactorToken(email: string, code: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (!existingToken) {
      throw new NotFoundException(
        'Token two-factor authentication not found. Please request a new token.',
      );
    }

    if (existingToken.token !== code) {
      throw new BadRequestException(
        'Invalid two-factor authentication code. Please check the code you entered and try again.',
      );
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new NotFoundException(
        'The two-factor authentication token has expired. Please request a new token.',
      );
    }

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.TWO_FACTOR,
      },
    });

    return true;
  }
  // 2. send two factor token
  public async sendTwoFactorToken(email: string) {
    const twoFactorToken = await this.generateTwoFactorToken(email);
  }

  // 3. generate TwoFactor token
  private async generateTwoFactorToken(email: string) {
    const token = Math.floor(
      Math.random() * (1000000 - 100000) + 100000,
    ).toString();

    const expiresIn = new Date(new Date().getTime() + 300000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.TWO_FACTOR,
        },
      });
    }

    const twoFactorToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.TWO_FACTOR,
      },
    });

    return twoFactorToken;
  }
}
