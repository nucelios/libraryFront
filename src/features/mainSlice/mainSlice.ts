import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "@/api/baseURL";

import { AxiosError, isAxiosError } from "axios";
import { RootState } from "@/store/store";

import { ILibrary } from "@/interfaces/ILibrary";
import { searchKeyword } from "@/interfaces/searchKeyword";



type State = {
  books: ILibrary[];
  findBooks: ILibrary[];
  book: ILibrary | null
  isLoading: boolean,
  error: string,

}

const initialState: State = {
  books: [],
  findBooks: [],
  book: null,
  isLoading: true,
  error: '',

}


export const getBooks = createAsyncThunk('library/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await baseURL.get(`library`);
    return await response.data

  } catch (e) {
    return rejectWithValue(`could not get Error: ${e}`)
  }
})

export const getBookById = createAsyncThunk('bookById/fetch', async (id: string, { rejectWithValue }) => {
  try {
    const response = await baseURL.get(`library/${id}`);
    return await response.data

  } catch (e) {
    return rejectWithValue(`could not get Error: ${e}`)
  }
})


export const postBook = createAsyncThunk(
  "post/Book",
  async (data: ILibrary, { rejectWithValue, getState }) => {

    try {
      const state: RootState = getState() as RootState;
      const response = await baseURL.post(`/library`, data, {
        headers: {
          Authorization: state.user.userInfo?.token,
        }
      });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        const error: AxiosError = err;
        return rejectWithValue(
          error || "Internet connection error"
        );
      }
      throw err;
    }
  }
);

export const findBook = createAsyncThunk(
  "find/Book",
  async (word: string, { rejectWithValue, getState }) => {
    const data: searchKeyword = {searchKeyword: word}
    try {
      const state: RootState = getState() as RootState;
      const response = await baseURL.post(`/library/find`, data, {
        headers: {
          Authorization: state.user.userInfo?.token,
        }
      });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        const error: AxiosError = err;
        return rejectWithValue(
          error || "Internet connection error"
        );
      }
      throw err;
    }
  }
);

export const editBook = createAsyncThunk(
  "edit/Book",
  async (data: ILibrary, { rejectWithValue, getState }) => {

    try {
      const state: RootState = getState() as RootState;
      const response = await baseURL.put(`/library/${data.id}`, data, {
        headers: {
          Authorization: state.user.userInfo?.token,
        }
      });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        const error: AxiosError = err;
        return rejectWithValue(
          error || "Internet connection error"
        );
      }
      throw err;
    }
  }
);


export const deleteBook = createAsyncThunk('book/delete', async (id: number | undefined, thunkAPI) => {
  try {
    const state: RootState = thunkAPI.getState() as RootState;

    await baseURL.delete(`library/${id}`, {
      headers: {
        Authorization: state.user.userInfo?.token,
      },
    });

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const mainSlice = createSlice({
  name: 'restaraunts', initialState, reducers: {


  }, extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
      .addCase(findBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(findBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.findBooks = action.payload
      })
      .addCase(findBook.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
      .addCase(postBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postBook.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(postBook.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.isLoading = false

      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
      .addCase(getBookById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.isLoading = false
        state.book = action.payload
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
      .addCase(editBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editBook.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editBook.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })

  }
})
export const mainReducer = mainSlice.reducer
export const { } = mainSlice.actions