import { createSlice } from '@reduxjs/toolkit';

interface Category {
    id: number;
    name: string;
}

interface CategoriesState {
    items: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoriesState = {
    items: [],
    status: 'idle',
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState, // Certifique-se de que o estado inicial está definido
    reducers: {
        // Adicione reducers aqui, se necessário
    },
    extraReducers: (builder) => {
        // Adicione extraReducers aqui, se necessário
    },
});

export default categoriesSlice.reducer;