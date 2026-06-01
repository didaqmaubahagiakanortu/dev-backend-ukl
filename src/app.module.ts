import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { BcryptService } from './bcrypt/bcrypt.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PassengerModule } from './passenger/passenger.module';
import { AdminModule } from './admin/admin.module';
import { TrainModule } from './train/train.module';
import { CarriageModule } from './carriage/carriage.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PassengerModule, AdminModule, TrainModule, CarriageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, BcryptService],
})
export class AppModule {}
