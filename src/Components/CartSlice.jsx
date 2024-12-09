import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: []
}

const CartSlice = createSlice({
    name: "cart", // khi được gọi từ file khác, sẽ dùng tên "cart" để access. e.g: cartItems = useSelector(state => state.cart.cartItems)
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id); // check product đã có trong cart chưa, có rồi thì +1, chưa có thì add mới.
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({...action.payload, quantity: 1});
            }
        },

        removeItemFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },

        clearCart(state) {
            state.cartItems = [];
        },

        increaseItemQuantity(state, action) {
            const itemToIncrease = state.cartItems.find(item => item.id === action.payload);
                if (itemToIncrease) {
                    itemToIncrease.quantity += 1;
                }
        },

        decreaseItemQuantity(state, action) {
            const itemToDecrease = state.cartItems.find(item => item.id === action.payload);
                if (itemToDecrease && itemToDecrease.quantity > 1) {
                    itemToDecrease.quantity -= 1;
                }
        },
    }
});

export const {
    addItemToCart,
    removeItemFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
