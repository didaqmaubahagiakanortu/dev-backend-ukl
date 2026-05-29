import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JWTStrategy } from '../helper/jwt-strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: Number(process.env.JWT_EXPIRATION)}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JWTStrategy],
  exports: [AuthService]
})
export class AuthModule {}
