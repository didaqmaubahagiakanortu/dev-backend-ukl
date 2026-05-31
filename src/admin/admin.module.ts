import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, BcryptService],
})
export class AdminModule {}
