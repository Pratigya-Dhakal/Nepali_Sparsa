// admin/src/slices/adminCommentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const response = await axios.get('/api/comments');
    return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async (comment) => {
    const response = await axios.post('/api/comments', comment);
    return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id) => {
    await axios.delete(`/api/comments/${id}`);
    return id;
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ id, comment }) => {
    const response = await axios.put(`/api/comments/${id}`, comment);
    return response.data;
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex((comment) => comment.id === action.payload.id);
                state.comments[index] = action.payload;
            });
    },
});

export default commentSlice.reducer;
