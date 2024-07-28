// admin/src/slices/adminCategorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('/api/categories');
    return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
    const response = await axios.post('/api/categories', category);
    return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
    await axios.delete(`/api/categories/${id}`);
    return id;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, name }) => {
    const response = await axios.put(`/api/categories/${id}`, { name });
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((category) => category.id !== action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex((category) => category.id === action.payload.id);
                state.categories[index] = action.payload;
            });
    },
});

export default categorySlice.reducer;
