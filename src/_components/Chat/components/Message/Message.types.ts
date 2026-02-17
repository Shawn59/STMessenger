import type { IUserModel } from '../../../../types/user';

export interface IMessageTypes {
  message: string;
  user: IUserModel;
  isAuthor?: boolean;
  date: string;
}
