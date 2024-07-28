// admin/src/slices/adminUserSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('/api/users');
    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
    const response = await axios.post('/api/users', user);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await axios.delete(`/api/users/${id}`);
    return id;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }) => {
    const response = await axios.put(`/api/users/${id}`, user);
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                state.users[index] = action.payload;
            });
    },
});

export default userSlice.reducer;
