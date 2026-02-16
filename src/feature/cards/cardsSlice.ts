import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  count: null,
  loading: false,
  error: null,
};

// Асинхронный thunk для получения постов
/*export const fetchCards = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.data; // это будет передан в action.payload при fulfilled
  } catch (error) {
    return rejectWithValue(error.message);
  }
});*/

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  //набор функций которые меняют состояние
  reducers: {
    incriment: () => {},

    decriment: () => {},
  },
});
