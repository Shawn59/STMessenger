import type { IUserModel } from '../../../../types/user';
import type { IMessageFile } from '../../Chat.types';

export interface IMessageTypes {
  message: string;
  user: IUserModel;
  isAuthor?: boolean;
  date: string;
  link?: string;
  file?: IMessageFile;
}
