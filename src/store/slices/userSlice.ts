import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getUsers, getUserById, updateUser, deleteUser, createUser } from '../../services/api';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

interface UserState {
    items: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getUsers();
    return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: number) => {
    const response = await getUserById(id);
    return response.data;
});

export const updateUserById = createAsyncThunk('users/updateUser', async (user: User) => {
    const response = await updateUser(user.id, user);
    return response.data;
});

export const deleteUserById = createAsyncThunk('users/deleteUser', async (id: number) => {
    await deleteUser(id);
    return id;
});

export const addUser = createAsyncThunk('users/addUser', async (user: User) => {
    const response = await createUser(user);
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users';
            });
    },
});

export default userSlice.reducer;