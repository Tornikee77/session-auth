import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/__generated__';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Connect to the database when the module is initialized
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  // Disconnect from the database when the module is destroyed
  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect;
  }
}
