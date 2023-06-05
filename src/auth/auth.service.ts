import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { accessTokenDto, registerDto, signInDto } from './dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  slatRound = 5;

  // register new user.............
  async register(user: registerDto) {
    // check already exists or not
    const isExists = await this.isExists(user.email);
    if (isExists) {
      throw new ForbiddenException('User already exists');
    }
    const hashPassword = await bcrypt.hash(user.password, this.slatRound);
    const refReshToken = await this.getRefreshTok(user.email);
    const result = await this.prismaService.users.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
        refresh_token: refReshToken,
      },
    });
    const accessToken = await this.getAccessToken({
      email: result.email,
      id: result.id,
    });
    return {
      email: result.email,
      user_id: result.id,
      name: result.name,
      accessToken,
    };
  }

  // Sign in new user
  async signIn(user: signInDto) {
    //   check is exists
    const isExists = await this.isExists(user.email);
    if (!isExists) {
      throw new NotFoundException('You are not register. Please sign up');
    }
    //   check password
    const checkPassword = await bcrypt.compare(
      user.password,
      isExists.password,
    );
    if (!checkPassword) {
      throw new ForbiddenException('Password not match!');
    }
    const accessToken = await this.getAccessToken({
      email: isExists.email,
      id: isExists.id,
    });
    return {
      email: isExists.email,
      user_id: isExists.id,
      name: isExists.name,
      accessToken,
    };
  }

  // logout.....................................
  async logOut(data: any) {
    const isExists = await this.isExists(data.email);
    if (!isExists) {
      throw new ForbiddenException('Invalid user.Please Login!');
    }

    await this.prismaService.users.update({
      where: { email: isExists.email },
      data: {
        refresh_token: null,
      },
    });
  }

  // get accessToken by refreshToken
  async refresh(token: any) {
    const data = this.jwtService.decode(token);
    if (typeof data === 'object') {
      // Access the 'email' property
      const email = data.email;
      const isExists = await this.isExists(email);
      if (isExists.refresh_token == null) {
        throw new ForbiddenException(' Please Login again.');
      }
      const accessToken = await this.getAccessToken({
        email: isExists.email,
        id: isExists.id,
      });
      const refreshToken = await this.getRefreshTok(isExists.email);
      await this.prismaService.users.update({
        where: { email: email },
        data: {
          refresh_token: refreshToken,
        },
      });
      return {
        accessToken: accessToken,
        email: isExists.email,
        name: isExists.name,
        user_id: isExists.id,
      };
    }
  }

  // Utils...................................
  async isExists(email: string) {
    const isExists = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });
    return isExists;
  }
  async getAccessToken(user: accessTokenDto) {
    const refreshTok = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        secret: 'ACCESS_TOK',
        expiresIn: 60 * 15,
      },
    );
    return refreshTok;
  }
  async getRefreshTok(email: string) {
    const refreshTok = await this.jwtService.signAsync(
      {
        email: email,
      },
      {
        secret: 'REFRESH_TOK',
        expiresIn: 60 * 60 * 24 * 7,
      },
    );
    return refreshTok;
  }
}
