import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/auth/AuthSlice';
import WishlistReducer from './Features/wishlist/WishlistSlice';
import cartReducer from './Features/cart/CartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: WishlistReducer,
    cart: cartReducer,
  },
});

export default store;
