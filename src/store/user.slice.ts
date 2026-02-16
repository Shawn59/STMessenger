import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface IUserState {
  jwt: string | null;
}

const initialState: IUserState = {
  jwt: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },

    logout: (state, action) => {
      state.jwt = null;
    },
  },
});

export const userSliceActions = userSlice.actions;
