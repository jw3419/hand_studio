import { Model, Column, Table } from 'sequelize-typescript';
import { UserAttributes } from 'src/interface/users.interface';

@Table({ timestamps: true })
export class User extends Model<UserAttributes> {
  @Column
  loginId: string;

  @Column
  password: string;

  @Column
  nickname: string;
}
