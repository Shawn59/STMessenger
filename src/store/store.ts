import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/user.slice';
import userProfileReducer from './userProfileModalSlice/userProfileModal.slice';
import snackbarReducer from './snackbarSlice/snackbarSlice.slice';
import { userStorageMiddleware } from './middleware/userStorage';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProfile: userProfileReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
