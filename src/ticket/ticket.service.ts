import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) { }

  async create(createTicketDto: CreateTicketDto) {
    try {
      const { origin, destination, departure, arrival, price, trainId, carriageId } = createTicketDto

      const train = await this.prisma.train.findFirst({
        where: {id: trainId}
      })
      if (!train) return {
        status: 'failed',
        message: `Train with the ID ${trainId} is not found`,
        data: null
      }

      const carriage = await this.prisma.carriage.findFirst({
        where: {id: carriageId}
      })
      if (!carriage) return {
        status: 'failed',
        message: `Carriage with the ID ${carriageId} is not found`,
        data: null
      }

      const createTicket = await this.prisma.ticket.create({
        data: {
          origin,
          destination,
          departure,
          arrival,
          price,
          train: {
            connect: { id: trainId }
          },
          carriage: {
            connect: { id: carriageId }
          }
        },
        include: {
          train: true,
          carriage: true,
          transactions: true
        }
      })

      return {
        status: 'success',
        message: 'Ticket successfully created',
        data: createTicket
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when creating ticket: ${error}`,
        data: null
      }
    }
  }

  async findAll() {
    try {
      const getAllTickets = await this.prisma.ticket.findMany({
        include: {
          train: true,
          carriage: true,
          transactions: true
        }
      })

      return {
        status: 'success',
        message: 'Tickets successfully returned',
        data: getAllTickets
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when getting tickets: ${error}`,
        data: null
      }
    }
  }

  async findOne(id: number) {
    try {
      const getTicketByID = await this.prisma.ticket.findFirst({
        where: { id },
        include: {
          train: true,
          carriage: true,
          transactions: true
        }
      })
      if (!getTicketByID) return {
        status: 'failed',
        message: `Ticket with the ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `Ticket with the ID ${id} successfully returned`,
        data: getTicketByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when getting ticket with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      const { origin, destination, departure, arrival, price, trainId, carriageId } = updateTicketDto

      const ticket = await this.prisma.ticket.findFirst({
        where: { id }
      })
      if (!ticket) return {
        status: 'failed',
        message: `Ticket with the ID ${id} is not found`,
        data: null
      }

            const train = await this.prisma.train.findFirst({
        where: {id: trainId}
      })
      if (!train) return {
        status: 'failed',
        message: `Train with the ID ${trainId} is not found`,
        data: null
      }

      const carriage = await this.prisma.carriage.findFirst({
        where: {id: carriageId}
      })
      if (!carriage) return {
        status: 'failed',
        message: `Carriage with the ID ${carriageId} is not found`,
        data: null
      }

      const updateTicket = await this.prisma.ticket.update({
        where: { id },
        data: {
          origin: origin ?? ticket.origin,
          destination: destination ?? ticket.destination,
          departure: departure ?? ticket.departure,
          arrival: arrival ?? ticket.arrival,
          price: price ?? ticket.price,
          train: trainId ?
            { connect: { id: trainId } } : {},
          carriage: carriageId ?
            { connect: { id: carriageId } } : {}
        },
        include: {
          train: true,
          carriage: true,
          transactions: true
        }
      })

      return {
        status: 'success',
        message: `Ticket with the ID ${id} successfully updated`,
        data: updateTicket
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating ticket with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const ticket = await this.prisma.ticket.findFirst({
        where: {id}
      })
      if (!ticket) return {
        status: 'failed',
        message: `Ticket with the ID ${id} is not found`,
        data: null
      }

      const deleteTicket = await this.prisma.ticket.delete({
        where: {id},
        include: {
          train: true,
          carriage: true,
          transactions: true
        }
      })

      return {
        status: 'success',
        message: `Ticket with the ID ${id} successfully deleted`,
        data: deleteTicket
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting ticket with the ID ${id}`,
        data: null
      }
    }
  }
}
