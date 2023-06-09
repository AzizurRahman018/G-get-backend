import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { wishList } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async addWishlist(data: wishList) {
    const isExists = await this.prismaService.wishList.findUnique({
      where: {
        user_id: data.userId,
      },
    });
    if (isExists) {
      console.log('i am');
      await this.prismaService.wishListPId.create({
        data: {
          product_id: data.productId,
          wishListId: isExists.id,
        },
      });
    } else {
      await this.prismaService.wishList.create({
        data: {
          user_id: data.userId,
          products: {
            create: {
              product_id: data.productId,
            },
          },
        },
      });
    }
  }
  // async getWishlist(userId: number) {
  //   const wishList = [];
  //   const list = await this.prismaService.wishList.findMany({
  //     where: {
  //       user_id: userId,
  //     },
  //   });
  //   const getListData = async (item: any) => {
  //     const data = await this.prismaService.products.findUnique({
  //       where: {
  //         id: item.product_id,
  //       },
  //     });

  //     await wishList.push(data);
  //   };
  //   for (let i = 0; i < list.length; i++) {
  //     await getListData(list[i]);
  //   }
  // console.log(list);
  // return wishList;
  // }
  async removeWishlist(data: wishList) {
    // await this.prismaService.wishList.delete({
    //   where: {
    //     product_id: data.productId,
    //   },
    // });
    const list = await this.prismaService.wishList.findMany({
      where: {
        user_id: data.userId,
      },
    });
    return list;
  }
}
