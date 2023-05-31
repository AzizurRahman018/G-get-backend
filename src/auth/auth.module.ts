import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/auth.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
