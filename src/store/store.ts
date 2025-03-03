import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
/*import orderReducer from './slices/orderSlice';*/
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        categories: categoryReducer,
    },
});

// Tipos para o estado global e dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;