import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserState } from './user.slice.types';
import { constants } from '../../constants';
import type { IUserModel } from '../../types/user';
import uuid from 'react-uuid';

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: constants.reduxSlice.user,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserModel>) => {
      state.user = action.payload;
      state.user.id = uuid();
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const actionSetUser = userSlice.actions.setUser;
export const actionLogout = userSlice.actions.logout;
export default userSlice.reducer;
