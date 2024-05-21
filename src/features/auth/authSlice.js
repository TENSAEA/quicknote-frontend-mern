import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import instance from "../../app/api/axios";

const authAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

// The error message indicates that the [createEntityAdapter](file:///home/tensae/Product-Management-Axios-RTK/frontend/src/features/product/productSlice.js#4%2C3-4%2C3) is expecting an [id](file:///home/tensae/Product-Management-Axios-RTK/frontend/src/features/product/productSlice.js#30%2C12-30%2C12) field on the entities, but the entity has an [_id](file:///home/tensae/Product-Management-Axios-RTK/backend/controllers/userController.js#29%2C7-29%2C7) field instead. To fix this, you need to provide a custom `selectId` implementation to the [createEntityAdapter](file:///home/tensae/Product-Management-Axios-RTK/frontend/src/features/product/productSlice.js#4%2C3-4%2C3) that uses [_id](file:///home/tensae/Product-Management-Axios-RTK/backend/controllers/userController.js#29%2C7-29%2C7) as the unique identifier.

// Here's how you can fix it in your [authSlice.js](file:///home/tensae/Product-Management-Axios-RTK/frontend/src/features/auth/authSlice.js#1%2C1-1%2C1):

// ```javascript:frontend/src/features/auth/authSlice.js
// 8|const authAdapter = createEntityAdapter({
// 9|  selectId: (instance) => instance._id,
// 10|});
// ```

// By adding the `selectId` option to `createEntityAdapter`, you're telling it to use the `_id` field from your entities as the unique identifier instead of the default `id` field.

const initialState = authAdapter.getInitialState({
  status: "idle",
  error: null,
  currentUserId: null,
});

export const signupUser = createAsyncThunk(
  "users/register",
  async (userData) => {
    const response = await instance.post("/users/register", userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (credentials) => {
    const response = await instance.post("/users/login", credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        authAdapter.setAll(state, [action.payload]);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Payload on login fulfilled:", action.payload);
        state.status = "succeeded";
        authAdapter.setAll(state, [action.payload]);
        state.currentUserId = action.payload._id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  authAdapter.getSelectors((state) => state.auth);
