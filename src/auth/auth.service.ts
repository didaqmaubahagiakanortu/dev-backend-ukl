import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bcrypt: BcryptService,
        private readonly jwt: JwtService
    ) { }

    async signIn(signInDto: SignInDto) {
        try {
            const { username, password } = signInDto
            const user = await this.prisma.user.findFirst({
                where: {
                    username: username
                }
            })

            if (!user) return {
                status: 'failed',
                message: 'Invalid username or password',
                data: null
            }

            const matchPassword = await this.bcrypt.comparePassword(password, user?.password)

            if (!matchPassword) return {
                status: 'failed',
                message: 'Invalid username or password',
                data: null
            }

            const token = await this.jwt.signAsync({id: user.id, name: user.username, role: user.role})

            return {
                status: 'success',
                message: 'Login successful',
                data: {
                    token,
                    role: user.role
                }
            }

        } catch (error) {
            return {
                status: 'failed',
                message: `Error when logging in: ${error}`,
                data: null
            }
        }
    }
}
