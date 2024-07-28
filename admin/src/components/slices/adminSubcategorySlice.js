// admin/src/slices/adminSubcategorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubcategories = createAsyncThunk('subcategories/fetchSubcategories', async () => {
    const response = await axios.get('/api/subcategories');
    return response.data;
});

export const addSubcategory = createAsyncThunk('subcategories/addSubcategory', async (subcategory) => {
    const response = await axios.post('/api/subcategories', subcategory);
    return response.data;
});

export const deleteSubcategory = createAsyncThunk('subcategories/deleteSubcategory', async (id) => {
    await axios.delete(`/api/subcategories/${id}`);
    return id;
});

export const updateSubcategory = createAsyncThunk('subcategories/updateSubcategory', async ({ id, name }) => {
    const response = await axios.put(`/api/subcategories/${id}`, { name });
    return response.data;
});

const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState: {
        subcategories: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubcategories.fulfilled, (state, action) => {
                state.subcategories = action.payload;
            })
            .addCase(addSubcategory.fulfilled, (state, action) => {
                state.subcategories.push(action.payload);
            })
            .addCase(deleteSubcategory.fulfilled, (state, action) => {
                state.subcategories = state.subcategories.filter((subcategory) => subcategory.id !== action.payload);
            })
            .addCase(updateSubcategory.fulfilled, (state, action) => {
                const index = state.subcategories.findIndex((subcategory) => subcategory.id === action.payload.id);
                state.subcategories[index] = action.payload;
            });
    },
});

export default subcategorySlice.reducer;
