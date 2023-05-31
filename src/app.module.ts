import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
