import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProductService, PrismaService],
  controllers: [ProductsController],
})
export class ProductsModule {}
