import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './Components/CartSlice';

const store = configureStore({
    reducer: {
        cart: CartSlice,
    },
});

export default store;