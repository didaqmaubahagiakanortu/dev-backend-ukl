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
            const { email, password } = signInDto
            const user = await this.prisma.user.findFirst({
                where: {
                    email
                }
            })

            if (!user) return {
                status: 'failed',
                message: 'Invalid email or password',
                data: null
            }

            const matchPassword = await this.bcrypt.comparePassword(password, user?.password)

            if (!matchPassword) return {
                status: 'failed',
                message: 'Invalid email or password',
                data: null
            }

            const token = await this.jwt.signAsync({id: user.id, email: user.email, role: user.role})

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
