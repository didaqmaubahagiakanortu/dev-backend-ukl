import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) { }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const { method, status, ticketAmount, passengerId, ticketId } = createTransactionDto

      const passenger = await this.prisma.passenger.findFirst({
        where: { id: passengerId }
      })
      if (!passenger) return {
        status: 'failed',
        message: `Passenger with the ID ${passengerId} is not found`,
        data: null
      }

      const ticket = await this.prisma.ticket.findFirst({
        where: { id: ticketId }
      })
      if (!ticket) return {
        status: 'failed',
        message: `Ticket with the ID ${ticket} is not found`,
        data: null
      }

      const createTransaction = await this.prisma.transaction.create({
        data: {
          method,
          status,
          ticketAmount,
          passenger: {
            connect: { id: passengerId }
          },
          ticket: {
            connect: { id: ticketId }
          }
        },
        include: {
          passenger: true,
          ticket: true
        }
      })

      return {
        status: 'success',
        message: 'Transaction successsfully created',
        data: createTransaction
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when creating transaction: ${error}`,
        data: null
      }
    }
  }

  async findAll() {
    try {
      const getAllTransactions = await this.prisma.transaction.findMany({
        include: {
          passenger: true,
          ticket: true
        }
      })

      return {
        status: 'success',
        message: 'Transactions successfully returned',
        data: getAllTransactions
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning transactions`,
        data: null
      }
    }
  }

  async findOne(id: number) {
    try {
      const getTransactionByID = await this.prisma.transaction.findFirst({
        where: { id },
        include: {
          passenger: true,
          ticket: true
        }
      })
      if (!getTransactionByID) return {
        status: 'failed',
        message: `Transaction with the ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `Transaction with the ID ${id} successfully returned`,
        data: getTransactionByID,
        total: Number(getTransactionByID.ticket?.price) * getTransactionByID.ticketAmount
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning transaction with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      const { method, status, ticketAmount, passengerId, ticketId } = updateTransactionDto

      const transaction = await this.prisma.transaction.findFirst({
        where: { id }
      })
      if (!transaction) return {
        status: 'failed',
        message: `Transaction with the ID ${id} is not found`,
        data: null
      }

      const passenger = await this.prisma.passenger.findFirst({
        where: { id: passengerId }
      })
      if (!passenger) return {
        status: 'failed',
        message: `Passenger with the ID ${passengerId} is not found`,
        data: null
      }

      const ticket = await this.prisma.ticket.findFirst({
        where: { id: ticketId }
      })
      if (!ticket) return {
        status: 'failed',
        message: `Ticket with the ID ${ticket} is not found`,
        data: null
      }

      const updateTransaction = await this.prisma.transaction.update({
        where: { id },
        data: {
          method: method ?? transaction.method,
          status: status ?? transaction.status,
          ticketAmount: ticketAmount ?? transaction.ticketAmount,
          passenger: passengerId ?
            { connect: { id: passengerId } } :
            {},
          ticket: ticketId ?
            { connect: { id: ticketId } } :
            {}
        },
        include: {
          passenger: true,
          ticket: true
        }
      })

      return {
        status: 'success',
        message: `Transaction with the ID ${id} successfully updated`,
        data: updateTransaction,
        total: Number(updateTransaction.ticket?.price) * updateTransaction.ticketAmount
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating transaction with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const transaction = await this.prisma.transaction.findFirst({
        where: { id }
      })
      if (!transaction) return {
        status: 'failed',
        message: `Transaction with the ID ${id} is not found`,
        data: null
      }

      const deleteTransaction = await this.prisma.transaction.delete({
        where: {id},
        include: {
          passenger: true,
          ticket: true
        }
      })

      return {
        status: 'success',
        message: `Transaction with the ID ${id} successfully deleted`,
        data: deleteTransaction
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting transaction with the ID ${id}: ${error}`,
        data: null
      }
    }
  }
}
