import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';

//@Controller 매개변수로 'auth'가 들어가지만, 본 과제를 위해서 빼도록 함.
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('user')
  getUser(@Query('token') token: string) {
    return this.authService.getUser(token);
  }

  @Post('user')
  signUp(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Post('login')
  signIn(
    @Body() userData: LoginUserDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.authService.signIn(userData, res);
  }
}
