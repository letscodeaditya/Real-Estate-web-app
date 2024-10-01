import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user= localStorage.getItem("user");
const city = user ? JSON.parse(user).city : 'kolkata';

const initialState = {
    loading: false,
    userData: null,
    error: null,
    updateSuccess: false,
    city: city,
}

const api = import.meta.env.VITE_API_BASE_URL;

    export const fetchUser = createAsyncThunk('user/fetchUser',async(formData,{rejectWithValue})=>
    {
        try {
            const response = await axios.post(`${api}/api/users/login`, formData);
            localStorage.setItem('user',JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to sign in');
        }
    });



    export const updateUser = createAsyncThunk(
        "user/updateUser",
        async (updatedData, { rejectWithValue }) => {
          try {
            const response = await axios.put(`${api}/api/users/update/${updatedData.email}`, updatedData);
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
          } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update user details");
          }
        }
      );    
      

    export const deleteUser = createAsyncThunk(
        "user/deleteUser",
        async (email, { rejectWithValue }) => {
          try {
            await axios.delete(`${api}/api/users/delete/${email}`);
            return { email };
          } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to delete account");
          }
        }
      );    




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUpdateSuccess(state) {
          state.updateSuccess = false;
        },
        logOut(state){
            state.userData = null;
            localStorage.removeItem("user");
            localStorage.removeItem("admin");
            state.dropState = false;
        },
        selectCity(state,action){
            state.city = action.payload;
        }
      },
    extraReducers: builder =>{
        builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.city = action.payload.city;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.payload;
      });

      builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null; 
        state.updateSuccess = false; 
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export const { resetUpdateSuccess,logOut,selectCity} = userSlice.actions;
export default userSlice.reducer;