import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard, Roles } from '../helper/roles-guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
