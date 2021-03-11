import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { UserAttributes } from 'src/interface/users.interface';

export class LoginUserDto {
  @IsEmail()
  public loginId: string;

  @IsString()
  public password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  public nickname: string;
}
