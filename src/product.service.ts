import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Products } from '@prisma/client';

@Injectable()
export class ProductService {
  static products: Products[] | PromiseLike<Products[]>;
  constructor(private prisma: PrismaService) {}

  // find all products
  async products(): Promise<Products[]> {
    return this.prisma.products.findMany();
  }

  // product by id
  async product(id: Prisma.ProductsWhereUniqueInput): Promise<Products> {
    return this.prisma.products.findUnique({
      where: id,
    });
  }
  // flashsale product

  async flashSale(): Promise<Products[]> {
    return this.prisma.products.findMany({
      where: {
        flashSale: true,
      },
    });
  }
  // products by category
  async productByCategory(
    category: Prisma.ProductsWhereInput,
  ): Promise<Products[]> {
    return this.prisma.products.findMany({
      where: category,
    });
  }
}
