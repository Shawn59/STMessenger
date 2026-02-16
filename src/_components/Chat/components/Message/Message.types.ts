import { IUser } from '@components';

export interface IMessageTypes {
  message: string;
  name: IUser['name'];
  lastName: IUser['lastName'];
  avatarImg?: IUser['avatarImg'];
  date: string;
}
