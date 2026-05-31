import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard, Roles } from '../helper/roles-guard';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @UsePipes(new ValidationPipe)
  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengerService.create(createPassengerDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(+id);
  }

  @UsePipes(new ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengerService.update(+id, updatePassengerDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengerService.remove(+id);
  }
}
