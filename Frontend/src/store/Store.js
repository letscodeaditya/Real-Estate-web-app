import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
// import propertyReducer from '../features/property/propertySlice'; 

const store = configureStore({
    reducer: {
        user: userReducer,
        // flat: propertyReducer.flat,  
        // bungalow: propertyReducer.bungalow,  
    }
});

export default store;
