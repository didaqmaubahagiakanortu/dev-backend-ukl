import { Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { PrismaService } from '../prisma/prisma.service';
import { connect } from 'http2';
import { FindTrainDto } from './dto/find-train.dto';

@Injectable()
export class TrainService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createTrainDto: CreateTrainDto) {
    try {
      const { name, carriageId } = createTrainDto

      const carriage = await this.prisma.carriage.findFirst({
        where: { id: carriageId }
      })
      if (!carriage) return {
        status: 'failed',
        message: `Carriage with the ID ${carriageId} is not found`,
        data: null
      }

      const createTrain = await this.prisma.train.create({
        data: {
          name,
          carriages: {
            connect: { id: carriageId }
          }
        },
        include: { carriages: true }
      })

      return {
        status: 'success',
        message: 'Train successfully created',
        data: createTrain
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when creating train: ${error}`,
        data: null
      }
    }

  }

  async findAll(findTrainDto: FindTrainDto) {
    try {
      const { search, page = 1, limit = 10 } = findTrainDto
      const skip = (page - 1) * limit

      const where: any = {}
      if (search) {
        where.name = { contains: search }
      }

      const getAllTrains = await this.prisma.train.findMany({
        where,
        skip,
        take: Number(limit),
        include: { carriages: true }
      })
      const total = await this.prisma.train.count({ where })

      return {
        status: 'success',
        message: 'Trains successfully returned',
        data: getAllTrains,
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
        message: `Error when getting trains: ${error}`,
        data: null
      }
    }
  }

  async findOne(id: number) {
    try {
      const findTrainByID = await this.prisma.train.findFirst({
        where: { id },
        include: { carriages: true }
      })
      if (!findTrainByID) return {
        status: 'failed',
        message: `Train with the ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `Train with the ID ${id} successfully returned`,
        data: findTrainByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning train with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async update(id: number, updateTrainDto: UpdateTrainDto) {
    try {
      const { name, carriageId } = updateTrainDto

      const train = await this.prisma.train.findFirst({
        where: { id }
      })
      if (!train) return {
        status: 'failed',
        message: `Train with the ID ${id} is not found`,
        data: null
      }

      const carriage = await this.prisma.carriage.findFirst({
        where: { id: carriageId }
      })
      if (!carriage) return {
        status: 'failed',
        message: `Carriage with the ID ${id} is not found`,
        data: null
      }

      const updateTrain = await this.prisma.train.update({
        where: { id },
        data: {
          name: name ?? train.name,
          carriages: carriageId ?
            { connect: { id: carriageId } } : {}
        },
        include: { carriages: true }
      })

      return {
        status: 'success',
        message: `Train with the ID ${id} successfully updated`,
        data: updateTrain
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating train with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const train = await this.prisma.train.findFirst({
        where: { id }
      })
      if (!train) return {
        status: 'failed',
        message: `Train with the ID ${id} is not found`,
        data: null
      }

      const deleteTrain = await this.prisma.train.delete({
        where: { id },
        include: { carriages: true }
      })

      return {
        status: 'success',
        message: `Train with the ID ${id} successfully deleted`,
        data: deleteTrain
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting train with the ID ${id}: ${error}`,
        data: null
      }
    }
  }
}
