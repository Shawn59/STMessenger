export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  status?: 1 | 0;
  avatarImg?: string;
}

export interface IUserState {
  user: IUser | null;
}
