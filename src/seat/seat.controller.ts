import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SeatService } from './seat.service';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindSeatDto } from './dto/find-seat.dto';
import { RoleGuard, Roles } from '../helper/roles-guard';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) { }

  @Get()
  findAll(@Query() findSeatDto: FindSeatDto) {
    return this.seatService.findAll(findSeatDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(+id, updateSeatDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}
