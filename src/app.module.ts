import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './libs/utils/is-dev.util';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProviderModule } from './auth/provider/provider.module';
import { MailModule } from './auth/mail/mail.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule,
  ],
})
export class AppModule {}
