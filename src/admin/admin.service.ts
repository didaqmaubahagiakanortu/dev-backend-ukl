import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JwtService
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    try {
      const { name, phone, email, password } = createAdminDto

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

      const createAdmin = await this.prisma.admin.create({
        data: {
          name,
          phone,
          user: {
            create: {
              email,
              password: await this.bcrypt.hashPassword(password),
              role: 'ADMIN'
            }
          }
        }, include: {
          user: true
        }
      })

      return {
        status: 'success',
        message: 'Admin successfully registered',
        data: createAdmin
      }

    } catch (error) {
      return {
        status: 'failed',
        message: `Error when registering admin: ${error}`,
        data: null
      }
    }
  }

  async findAll() {
    try {
      const getAllAdmins = await this.prisma.admin.findMany({
        include: { user: true }
      })

      return {
        status: 'success',
        message: 'Admins succesfully returned',
        data: getAllAdmins
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning admins: ${error}`,
        data: null
      }
    }
  }

  async findOne(id: number) {
    try {
      const findAdminByID = await this.prisma.admin.findFirst({
        where: {
          id
        }, include: { user: true }
      })

      if (!findAdminByID) return {
        status: 'failed',
        message: `Admin with the ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `Admin with the ID ${id} successfully returned`,
        data: findAdminByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning admin with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async findMe(user: any) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { userId: user.id },
        include: { user: true }
      })

      return {
        status: 'success',
        message: `Admin with the ID ${admin?.id} successfully returned`,
        data: admin
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning admin: ${error}`,
        data: null
      }
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const { name, phone, password } = updateAdminDto

      const admin = await this.prisma.admin.findFirst({ where: { id } })
      if (!admin) return {
        status: 'failed',
        message: `Admin with the ID ${id} is not found`,
        data: null
      }

      const user = await this.prisma.user.findFirst({ where: { id: admin.userId } })

      const updateAdmin = await this.prisma.admin.update({
        where: { id }, data: {
          name: name ?? admin?.name,
          phone: phone ?? admin?.phone,
          user: {
            update: {
              password: password ? await this.bcrypt.hashPassword(password) : user?.password
            }
          }
        }, include: { user: true }
      })

      return {
        status: 'success',
        message: `Admin with the ID ${id} successfully updated`,
        data: updateAdmin
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating admin with the ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const admin = await this.prisma.admin.findFirst({ where: { id } })

      if (!admin) return {
        status: 'failed',
        message: `Admin with the ID ${id} is not found`,
        data: null
      }

      const deleteAdmin = await this.prisma.admin.delete({
        where: { id },
        include: { user: true }
      })

      const deleteUser = await this.prisma.user.delete({
        where: { id: admin.userId }
      })

      return {
        status: 'success',
        message: 'Admin successfully deleted',
        data: deleteAdmin
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
