import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice'
import cartSlice from './features/cart/cartSlice';

const Store = configureStore({
    
    reducer:{
        user:userReducer,
        cart:cartSlice,
    }
})

export default Store;
