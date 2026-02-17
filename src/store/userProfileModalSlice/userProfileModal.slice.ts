import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { constants } from '../../constants';

const userProfileSlice = createSlice({
  name: constants.reduxSlice.userProfile,
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<User>) => {
      state.isOpen = true;
      state.userData = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.userData = null;
    },
  },
});

export default userProfileSlice;
