export interface UserAttributes {
  id?: number;
  loginId: string;
  password: string;
  nickname: string;
  createdAt?: Date;
  updatedAt?: Date;
}
