import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { jwtDecode } from 'jwt-decode'
import { PayTransactionDto } from './dto/pay-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) { }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const { ticketAmount, passengerId, ticketId } = createTransactionDto

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

  // async findMe(token: string) {
  //   try {
  //     const decoded = await jwtDecode(token, {header: true})

  //     return decoded

  //   } catch (error) {
  //     return {
  //       status: 'failed',
  //       message: `Error when returning transaction: ${error}`,
  //       data: null
  //     }
  //   }
  // }

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
      const { ticketAmount, passengerId, ticketId } = updateTransactionDto

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
        where: { id },
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

  async pay(id: number, payTransactionDto: PayTransactionDto) {
    try {
      const { method } = payTransactionDto
      const transaction = await this.prisma.transaction.findFirst({
        where: { id },
        include: {
          passenger: true,
          ticket: true
        }
      })
      if (!transaction) return {
        status: 'failed',
        message: `Transaction with the ID ${id} is not found`,
        data: null
      }

      if (method === "UNPAID") return {
        status: 'failed',
        message: 'Payment method must be included',
        data: null
      }

      if (transaction.status === "PAID") return {
        status: 'failed',
        message: `Transaction with the ID ${id} has already been paid`,
        data: transaction
      }
      else if (transaction.status === "CANCELLED") return {
        status: 'failed',
        message: `Transaction with the ID ${id} has already been cancelled`,
        data: transaction
      }

      const payTansaction = await this.prisma.transaction.update({
        where: { id },
        data: {
          method,
          status: "PAID"
        },
        include: {
          passenger: true,
          ticket: true
        }
      })

      return {
        status: 'success',
        message: `Ticket with the ID ${id} successfully paid`,
        data: payTansaction
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when paying transaction with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async cancel(id: number) {
    try {
      const transaction = await this.prisma.transaction.findFirst({
        where: { id },
        include: {
          passenger: true,
          ticket: true
        }
      })
      if (!transaction) return {
        status: 'failed',
        message: `Transaction with the ID ${id} is not found`,
        data: null
      }

      if (transaction.status === "PAID") return {
        status: 'failed',
        message: `Transaction with the ID ${id} has already been paid`,
        data: transaction
      }
      else if (transaction.status === "CANCELLED") return {
        status: 'failed',
        message: `Transaction with the ID ${id} has already been cancelled`,
        data: transaction
      }

      const cancelTransaction = await this.prisma.transaction.update({
        where: { id },
        data: {
          status: "CANCELLED"
        },
        include: {
          passenger: true,
          ticket: true
        }
      })

      return {
        status: 'success',
        message: `Transaction with the ID ${id} successfully cancelled`,
        data: cancelTransaction
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when cancelling transaction with the ID ${id}: ${error}`,
        data: null
      }
    }
  }
}
