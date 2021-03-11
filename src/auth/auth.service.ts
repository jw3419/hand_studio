import { HttpException, Injectable } from '@nestjs/common';
import { UserAttributes } from 'src/interface/users.interface';
import { User } from 'src/model/users.model';
import * as bcrypt from 'bcryptjs';
import { authHandler, createToken } from 'src/middleware/auth.middleware';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';

@Injectable()
export class AuthService {
  public users = User;

  public async getUser(token: string) {
    const getUserData: UserAttributes = await authHandler(token);

    if (!getUserData)
      throw new HttpException('Failed to fetch user information.', 409);

    return { loginId: getUserData.loginId, nickname: getUserData.nickname };
  }

  public async signUp(userData: CreateUserDto): Promise<object> {
    const findUser: UserAttributes = await this.users.findOne({
      where: { loginId: userData.loginId },
    });

    if (findUser)
      throw new HttpException(
        `You're email ${userData.loginId} already exists`,
        409,
      );

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: UserAttributes = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return { success: true };
  }

  public async signIn(
    userData: LoginUserDto,
    res: FastifyReply,
  ): Promise<object> {
    const findUser: UserAttributes = await this.users.findOne({
      where: { loginId: userData.loginId },
    });

    if (!findUser)
      throw new HttpException(
        `You're email ${userData.loginId} not found`,
        409,
      );

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findUser.password,
    );

    if (!isPasswordMatching)
      throw new HttpException("You're password not matching", 409);

    const tokenData = createToken(userData);

    return { success: true, token: tokenData };
  }
}
