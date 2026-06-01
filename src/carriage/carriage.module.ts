import { Module } from '@nestjs/common';
import { CarriageService } from './carriage.service';
import { CarriageController } from './carriage.controller';

@Module({
  controllers: [CarriageController],
  providers: [CarriageService],
})
export class CarriageModule {}
