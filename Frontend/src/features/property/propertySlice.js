// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialStateFlat = {
//   loading: false,
//   error: null,
//   flatSellData: [],
//   flatRentData: [],
//   updateSuccess: false,
// };

// const initialStateBungalow = {
//   loading: false,
//   error: null,
//   bungalowSellData: [],
//   bungalowRentData: [],
//   updateSuccess: false,
// };

// const api = import.meta.env.VITE_API_BASE_URL;

// export const fetchFlatSale = createAsyncThunk('flat/fetchFlatSale', async (value, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${api}/api/flats/sell/${value}/0/4`);
//     console.log("API Response: ", response.data); 
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch data');
//   }
// });

// export const fetchFlatRent = createAsyncThunk('flat/fetchFlatRent', async (value, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${api}/api/flats/rent/${value}/0/4`);
//     console.log("API Response: ", response.data); 
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch data');
//   }
// });

// export const fetchBungalowSell = createAsyncThunk('bungalow/fetchBungalowSell', async (value, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${api}/api/bungalows/sell/${value}/0/4`);
//     return response.data;
//     console.log("API Response: ", response.data); 
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch data');
//   }
// });

// export const fetchBungalowRent = createAsyncThunk('bungalow/fetchBungalowRent', async (value, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${api}/api/bungalows/rent/${value}/0/4`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch data');
//   }
// });

// export const flatSlice = createSlice({
//   name: 'flat',
//   initialState: initialStateFlat,
//   reducers: {
//     resetUpdateSuccessFlat(state) {
//       state.updateSuccess = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFlatSale.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFlatSale.fulfilled, (state, action) => {
//         state.loading = false;
//         state.flatSellData = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchFlatSale.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchFlatRent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFlatRent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.flatRentData = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchFlatRent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const bungalowSlice = createSlice({
//   name: 'bungalow',
//   initialState: initialStateBungalow,
//   reducers: {
//     resetUpdateSuccessBungalow(state) {
//       state.updateSuccess = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBungalowSell.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBungalowSell.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bungalowSellData = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchBungalowSell.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchBungalowRent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBungalowRent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bungalowRentData = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchBungalowRent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetUpdateSuccessFlat } = flatSlice.actions;
// export const { resetUpdateSuccessBungalow } = bungalowSlice.actions;

// export default {
//   flat: flatSlice.reducer,
//   bungalow: bungalowSlice.reducer,
// };
