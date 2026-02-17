import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IUserState } from './user.slice.types';
import { constants } from '../../constants';

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: constants.reduxSlice.user,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const actionSetUser = userSlice.actions.setUser;
export const actionLogout = userSlice.actions.logout;
export default userSlice.reducer;
