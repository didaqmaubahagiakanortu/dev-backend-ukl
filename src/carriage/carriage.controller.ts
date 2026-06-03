import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { CarriageService } from './carriage.service';
import { CreateCarriageDto } from './dto/create-carriage.dto';
import { UpdateCarriageDto } from './dto/update-carriage.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard, Roles } from '../helper/roles-guard';
import { FindCarriageDto } from './dto/find-carriage.dto';

@Controller('carriage')
export class CarriageController {
  constructor(private readonly carriageService: CarriageService) { }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe)
  @Post()
  create(@Body() createCarriageDto: CreateCarriageDto) {
    return this.carriageService.create(createCarriageDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Get()
  findAll(@Query() findCarriageDto: FindCarriageDto) {
    return this.carriageService.findAll(findCarriageDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carriageService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarriageDto: UpdateCarriageDto) {
    return this.carriageService.update(+id, updateCarriageDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carriageService.remove(+id);
  }
}
