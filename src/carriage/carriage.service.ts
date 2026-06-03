import { Injectable } from '@nestjs/common';
import { CreateCarriageDto } from './dto/create-carriage.dto';
import { UpdateCarriageDto } from './dto/update-carriage.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarriageService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createCarriageDto: CreateCarriageDto) {
    try {
      const { code, classification, seats } = createCarriageDto

      const seatsTransformed = seats.map(seat => ({ code: seat }))

      console.log(createCarriageDto);

      const createCarriage = await this.prisma.carriage.create({
        data: {
          code: code,
          class: classification,
          seats: {
            createMany: { data: seatsTransformed }
          }
        }, include: {
          train: true,
          seats: true
        }
      })

      return {
        status: 'success',
        message: 'Carriage successfully created',
        data: createCarriage
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when creating carriage: ${error}`,
        data: null
      }
    }
  }

  async findAll() {
    try {
      const getAllCarriages = await this.prisma.carriage.findMany({
        include: {
          train: true,
          seats: true
        }
      })

      return {
        status: 'success',
        message: 'Carriages succesfully returned',
        data: getAllCarriages
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning carriages: ${error}`,
        data: null
      }
    }
  }

  async findOne(id: number) {
    try {
      const getCarriageByID = await this.prisma.carriage.findFirst({
        where: { id },
        include: {
          train: true,
          seats: true
        }
      })
      if (!getCarriageByID) return {
        status: 'failed',
        message: `Carriage with the ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `Carriage with the ID ${id} succesfully returned`,
        data: getCarriageByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning carriage with the ID ${id}: ${error}`,
        data: null
      }
    }

  }

  async update(id: number, updateCarriageDto: UpdateCarriageDto) {
    try {
      const { code, classification, seats } = updateCarriageDto

      const carriage = await this.prisma.carriage.findFirst({
        where: { id },
        include: {
          train: true,
          seats: true
        }
      })
      if (!carriage) return {
        status: 'failed',
        message: `Carriage with the ID ${id} is not found`,
        data: null
      }

      const seatsTransformed = seats?.map(seat => (
        { code: seat }
      ))

      const updateCarriage = await this.prisma.carriage.update({
        where: { id },
        data: {
          code: code ?? carriage.code,
          class: classification ?? carriage.class,
          seats: seats ?
            { createMany: { data: seatsTransformed } } as any : {}
        },
        include: {
          train: true,
          seats: true
        }
      })

      return {
        status: 'success',
        message: `Carriage with the ID ${id} successfully updated`,
        data: updateCarriage
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating carriage with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const carriage = await this.prisma.carriage.findFirst({
        where: { id }
      })
      if (!carriage) return {
        status: 'failed',
        message: `Carriage with the ID ${id} is not found`,
        data: null
      }

      const deleteCarriage = await this.prisma.carriage.delete({
        where: { id },
        include: { train: true }
      })

      return {
        status: 'success',
        message: `Carriage with the ID ${id} successfully deleted`,
        data: deleteCarriage
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting carriage with the ID ${id}: ${error}`,
        data: null
      }
    }

  }
}

