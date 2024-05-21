import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import instance from "../../app/api/axios";

const userAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
  currentUserId: null,
});

// Add this thunk to fetch the user profile
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await instance.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async () => {
    const response = await instance.get("/users/profile");
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData) => {
    const response = await instance.put("/users/updateProfile", updatedData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.currentUserId = action.payload.id;
    },
    userLoggedOut: (state) => {
      state.currentUserId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        userAdapter.upsertOne(state, action.payload);
        state.currentUserId = action.payload._id;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        userAdapter.upsertOne(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        userAdapter.upsertOne(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdapter.getSelectors((state) => state.user);

export default userSlice.reducer;
