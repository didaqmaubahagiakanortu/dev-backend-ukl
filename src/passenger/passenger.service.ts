import { Injectable } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { FindPassengerDto } from './dto/find-passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    private prisma: PrismaService,
    private readonly bcrypt: BcryptService
  ) { }

  async create(createPassengerDto: CreatePassengerDto) {
    try {
      const { name, phone, email, password } = createPassengerDto

      const checkEmail = await this.prisma.user.findFirst({
        where: {
          email
        }
      })

      if (checkEmail) return {
        status: 'failed',
        message: `User with the email ${email} already exists`,
        data: null
      }

      const register = await this.prisma.passenger.create({
        data: {
          name,
          phone,
          user: {
            create: {
              email,
              password: await this.bcrypt.hashPassword(password),
              role: 'USER'
            }
          }
        }, include: {
          user: true
        }
      })

      return {
        status: 'success',
        message: 'Passenger successfully registered',
        data: register
      }

    } catch (error) {
      return {
        status: 'failed',
        message: `Error when registering passenger: ${error}`,
        data: null
      }
    }

  }

  async findAll(findPassengerDto: FindPassengerDto) {
    try {
      const { search, page = 1, limit = 10 } = findPassengerDto
      const skip = (page - 1) * limit

      const where: any = {}
      if (search) {
        where.name = { contains: search }
      }

      const getAllPassengers = await this.prisma.passenger.findMany({
        where,
        skip,
        take: Number(limit),
        include: { user: true }
      })
      const total = await this.prisma.passenger.count({ where })

      return {
        status: 'success',
        message: 'Passengers succesfully returned',
        data: getAllPassengers,
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
        message: `Error when returning passengers: ${error}`,
        data: null
      }
    }

  }

  async findOne(id: number) {
    try {
      const findPassengerByID = await this.prisma.passenger.findFirst({
        where: {
          id
        }, include: { user: true }
      })

      if (!findPassengerByID) return {
        status: 'failed',
        message: `Passenger with the ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `Passenger with the ID ${id} successfully returned`,
        data: findPassengerByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning passenger with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async findMe(user: any) {
    try {
      const passenger = await this.prisma.passenger.findFirst({
        where: { userId: user.id },
        include: {
          user: true,
          transactions: true
        }
      })

      return {
        status: 'success',
        message: `Passenger with the ID ${passenger?.id} successfully returned`,
        data: passenger
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning passenger: ${error}`,
        data: null
      }
    }
  }

  async update(id: number, updatePassengerDto: UpdatePassengerDto) {
    try {
      const { name, phone, password } = updatePassengerDto

      const passenger = await this.prisma.passenger.findFirst({ where: { id } })
      if (!passenger) return {
        status: 'failed',
        message: `Passenger with the ID ${id} is not found`,
        data: null
      }

      const user = await this.prisma.user.findFirst({ where: { id: passenger.userId } })

      const updatePassenger = await this.prisma.passenger.update({
        where: { id }, data: {
          name: name ?? passenger?.name,
          phone: phone ?? passenger?.phone,
          user: {
            update: {
              password: password ? await this.bcrypt.hashPassword(password) : user?.password
            }
          }
        }, include: { user: true }
      })

      return {
        status: 'success',
        message: `Passenger with the ID ${id} successfully updated`,
        data: updatePassenger
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating passenger with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const passenger = await this.prisma.passenger.findFirst({ where: { id } })

      if (!passenger) return {
        status: 'failed',
        message: `Passenger with the ID ${id} is not found`,
        data: null
      }

      const deletePassenger = await this.prisma.passenger.delete({
        where: { id },
        include: { user: true }
      })

      const deleteUser = await this.prisma.user.delete({
        where: { id: passenger.userId }
      })

      return {
        status: 'success',
        message: 'Passenger successfully deleted',
        data: deletePassenger
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting passenger: ${error}`,
        data: null
      }
    }

  }
}
