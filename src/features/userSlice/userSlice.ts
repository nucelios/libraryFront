import baseURL from "@/api/baseURL";
import { ITrackHistory } from "@/interfaces/ITrackHistory";
import { IUser } from "@/interfaces/IUser";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { isAxiosError } from "axios";

interface userState {
  userInfo: IUser | null;
  userHistoryTracks: ITrackHistory[] | null;
  loading: boolean;
  logged: boolean;
  registerError: null | string | userResponseValidateError;
  loginError: null | string;
}

type userRequest = {
  username: string;
  password: string;
};

type userResponseError = {
  error: { message: string };
};

type userResponseValidateError = { type: string; messages: string[] }[];


export const registerUser = createAsyncThunk<
  IUser,
  userRequest,
  { rejectValue: userResponseError | userResponseValidateError }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await baseURL.post<IUser>(
      "users",
      userData
    );
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosError<userResponseError> = err;
      return rejectWithValue(
        error.response?.data || { error: { message: "An error occurred" } }
      );
    }
    throw err;
  }
});

export const loginUser = createAsyncThunk<
  IUser,
  userRequest,
  { rejectValue: string }
>("auth.login", async (userData, { rejectWithValue }) => {
  try {
    const response = await baseURL.post<IUser>("users/sessions", userData);
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosError<userResponseError> = err;
      return rejectWithValue(
        error.response?.data.error.message || "Internet connection error"
      );
    }
    throw err;
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).user.userInfo?.token;
    try {
      const response = await baseURL.delete("/users/logout", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        const error: AxiosError<userResponseError> = err;
        return rejectWithValue(
          error.response?.data.error.message || "Internet connection error"
        );
      }
      throw err;
    }
  }
);


const initialState: userState = {
  userInfo: null,
  userHistoryTracks: null,
  registerError: null,
  loginError: null,
  loading: false,
  logged: false,
};
export const getHistoryTracks = createAsyncThunk('auth/historyData', async (_, thunkAPI) => {
  try {
    const state:RootState = thunkAPI.getState() as RootState;
    const response = await baseURL.get('track_history', {
      headers: {
        Authorization: state.user.userInfo?.token,      
      },  
    });
    return response.data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const PostHistoryTracks = createAsyncThunk('autt/PosthistoryData', async (id:number, thunkAPI) => {
  try {
    const state:RootState = thunkAPI.getState() as RootState;
    const data = {trackId: id} 
    const response = await baseURL.post('track_history', data, {
      headers: {
        Authorization: state.user.userInfo?.token,      
      },  
    });
    return response.data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
        state.loading = false;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.registerError = action.payload;
        } else {
          state.registerError =
            action.payload?.error.message ?? "Error occurred";
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.logged = true
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.logged = false
        state.loginError = action.payload || null;
      })
      .addCase(getHistoryTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistoryTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.userHistoryTracks = action.payload;
      })
      .addCase(getHistoryTracks.rejected, (state) => {
        state.loading = false;
        
      })
      .addCase(PostHistoryTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostHistoryTracks.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostHistoryTracks.rejected, (state) => {
        state.loading = false;
        
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      });;

  },
});

export default userSlice;

export const userSelect = (state: any) => {
  return state.user.userInfo;
};
