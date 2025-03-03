import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../../services/api';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
}

interface ProductState {
    items: Product[];
    selectedProduct: Product | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    selectedProduct: null,
    status: 'idle',
    error: null,
};

// Ação assíncrona para buscar todos os produtos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await getProducts();
    return response.data;
});

// Ação assíncrona para buscar um produto por ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
    const response = await getProductById(id);
    return response.data;
});

// Ação assíncrona para criar um produto
export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
    const response = await createProduct(product);
    return response.data;
});

// Ação assíncrona para atualizar um produto
export const updateProductById = createAsyncThunk('products/updateProduct', async (product: Product) => {
    const response = await updateProduct(product.id, product);
    return response.data;
});

// Ação assíncrona para deletar um produto
export const deleteProductById = createAsyncThunk('products/deleteProduct', async (id: number) => {
    await deleteProduct(id);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Buscar todos os produtos
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Erro ao buscar produtos';
            })

            // Buscar um produto por ID
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Erro ao buscar produto';
            })

            // Adicionar um produto
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // Atualizar um produto
            .addCase(updateProductById.fulfilled, (state, action) => {
                const index = state.items.findIndex((product) => product.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            // Deletar um produto
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.items = state.items.filter((product) => product.id !== action.payload);
            });
    },
});

export default productSlice.reducer;