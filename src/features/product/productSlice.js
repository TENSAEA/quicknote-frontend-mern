import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import instance from "../../app/api/axios";

const productAdapter = createEntityAdapter({
  selectId: (instance) => instance._id,
});

const initialState = productAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await instance.get("/products");
  return response.data;
});

export const addProduct = createAsyncThunk(
  "products/add",
  async (productData) => {
    const response = await instance.post("/products", productData);
    return response.data;
  }
);

// export const updateProduct = createAsyncThunk(
//   "products/update",
//   async ({ id, ...updateData }) => {
//     const response = await instance.put(`/products/${id}`, updateData);
//     return response.data;
//   }
// );

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/products/${id}`, updateData);
      return response.data;
    } catch (error) {
      // Log the error or handle it as needed
      console.error("Error updating product:", error.response.data);
      // This assumes the server responds with error details in JSON format
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await instance.delete(`/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, productAdapter.setAll)
      .addCase(addProduct.fulfilled, productAdapter.addOne)
      .addCase(updateProduct.fulfilled, productAdapter.upsertOne)
      .addCase(deleteProduct.fulfilled, productAdapter.removeOne);
  },
});

export default productSlice.reducer;

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productAdapter.getSelectors((state) => state.product);
