import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard, Roles } from '../helper/roles-guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @UsePipes(new ValidationPipe)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('me')
  findMe(@Body() token: string) {
    return this.transactionService.findMe(token)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
