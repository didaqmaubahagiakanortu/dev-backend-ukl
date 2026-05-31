import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService, BcryptService],
})
export class PassengerModule {}
