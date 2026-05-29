import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly bcrypt: BcryptService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { username, password, role } = createUserDto

      const getUserByUsername = await this.prisma.user.findFirst({
        where: {
          username: username
        }
      })

      if (getUserByUsername) return {
        status: 'failed',
        message: `User with the name ${username} already exists`,
        data: null
      }

      const createUser = await this.prisma.user.create({
        data: {
          username: username,
          password: await this.bcrypt.hashPassword(password),
          role: role
        }
      })
      return {
        status: 'success',
        message: 'User successfully created',
        data: createUser
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when creating user: ${error}`,
        data: null
      }
    }
  }

  async findAll() {
    try {
      const getAllUsers = await this.prisma.user.findMany()
      return {
        status: 'success',
        message: 'All users successfully returned',
        data: getAllUsers
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when returning all users: ${error}`,
        data: null
      }
    }

  }

  async findOne(id: number) {
    try {
      const getUserByID = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      if (!getUserByID) return {
        status: 'failed',
        message: `User with ID ${id} is not found`,
        data: null
      }

      return {
        status: 'success',
        message: `User with ID ${id} successfully returned`,
        data: getUserByID
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when getting user with ID ${id}: ${error}`,
        data: null
      }
    }

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { username, password, role } = updateUserDto

      const getUserByID = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      if (!getUserByID) return {
        status: 'failed',
        message: `User with ID ${id} is not found`,
        data: null
      }

      const updateUser = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          username: getUserByID?.username ?? username,
          password: password ? await this.bcrypt.hashPassword(password) : getUserByID?.password,
          role: getUserByID?.role ?? role
        }
      })

      return {
        status: 'success',
        message: `User with ID ${id} successfully updated`,
        data: updateUser
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when updating user with ID ${id}: ${error}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const getUserByID = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      if (!getUserByID) return {
        status: 'failed',
        message: `User with ID ${id} is not found`,
        data: null
      }

      const deleteUser = await this.prisma.user.delete({
        where: {
          id: id
        }
      })

      return {
        status: 'success',
        message: `User with ID ${id} successfully deleted`,
        data: deleteUser
      }
    } catch (error) {
      return {
        status: 'failed',
        message: `Error when deleting user with ID ${id}: $${error}`,
        data: null
      }
    }

  }
}
