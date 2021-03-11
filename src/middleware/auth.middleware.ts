import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { UserAttributes } from '../interface/users.interface';
import { User } from '../model/users.model';
import { HttpException } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dto/users.dto';

var jwt = new JwtService({ secret: process.env.JWT_SECRET });

export const createToken = (userData: LoginUserDto) => {
  delete userData.password;
  const expiresIn: number = 60 * 60;
  const accessToken = jwt.sign(userData, {
    expiresIn: expiresIn,
  });

  return accessToken;
};

export const authHandler = async (token) => {
  try {
    if (token) {
      const verificationResponse = jwt.verify(token);

      const findUser: UserAttributes = await User.findOne({
        where: { loginId: verificationResponse.loginId },
      });

      if (findUser) {
        return findUser;
      } else {
        throw new HttpException('Wrong authentication token', 401);
      }
    } else {
      throw new HttpException('Authentication token missing', 404);
    }
  } catch (error) {
    throw new HttpException('Wrong authentication token', 401);
  }
};
