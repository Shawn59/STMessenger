import type { IUserModel } from '../../../../types/user';
import { IMessageFile } from '../../../../store/socketSlice/socket.slice.types';

export interface IMessageTypes {
  message: string;
  user: IUserModel;
  isAuthor?: boolean;
  date: string;
  link?: string;
  file?: IMessageFile;
}
