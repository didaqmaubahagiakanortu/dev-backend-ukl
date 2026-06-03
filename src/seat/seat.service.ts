import { Injectable } from '@nestjs/common';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindSeatDto } from './dto/find-seat.dto';

@Injectable()
export class SeatService {
  constructor(private prisma: PrismaService) { }

  async findAll(findseatDto: FindSeatDto) {
    try {
      const { search, page = 1, limit = 10, taken, carriageId } = findseatDto
      const skip = (page - 1) * limit

      const where: any = {}
      if (search) {
        where.code = { contains: search }
      }
      if (taken == 'true') {
        where.taken = true
      } else if (taken == 'false') {
        where.taken = false
      }
      if (carriageId) {
        where.carriageId = Number(carriageId)
      }

      const getAllSeats = await this.prisma.seat.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          carriage: true
        }
      })
      const total = await this.prisma.seat.count({ where })

      return {
        status: 'success',
        message: 'Seats successfully returned',
        taken: where.taken,
        data: getAllSeats,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit)
        }
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning seats: ${error}`,
        data: null
      }
    }
  }

  async findOne(id: number) {
    try {
      const getSeatByID = await this.prisma.seat.findFirst({
        where: { id },
        include: { carriage: true }
      })
      if (!getSeatByID) return {
        status: 'failed',
        message: `Seat with the ID ${id} is not found`
      }

      return {
        status: 'success',
        message: `Seat with the ID ${id} successfully returned`,
        data: getSeatByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning seat with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    try {
      const { code, taken } = updateSeatDto

      const seat = await this.prisma.seat.findFirst({
        where: { id }
      })
      if (!seat) return {
        status: 'failed',
        message: `Seat with the ID ${id} is not found`,
        data: null
      }

      let takenData: boolean = seat.taken
      if (taken == 'true') {
        takenData = true
      } else if (taken == 'false') {
        takenData = false
      }

      const updateSeat = await this.prisma.seat.update({
        where: { id },
        data: {
          code: code ?? seat.code,
          taken: takenData ?? seat.taken
        },
        include: { carriage: true }
      })

      return {
        status: 'success',
        message: `Seat with the ID ${id} successfully updated`,
        data: updateSeat
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating seat with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const seat = await this.prisma.seat.findFirst({
        where: { id }
      })
      if (!seat) return {
        status: 'failed',
        message: `Seat with the ID ${id} is not found`,
        data: null
      }

      const deleteSeat = await this.prisma.seat.delete({
        where: { id },
        include: { carriage: true }
      })

      return {
        status: 'success',
        message: `Seat with the ID ${id} successfully deleted`,
        data: deleteSeat
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting seat with the ID ${id}: ${error}`,
        data: null
      }
    }
  }
}
