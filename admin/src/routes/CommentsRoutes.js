// src/routes/CommentsRoutes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comments from '../components/dashboard/comment/Comments';

const CommentsRoutes = () => {
    return (
        <Routes>
            <Route path="/product/:productId/comments" element={<Comments />} />
        </Routes>
    );
};

export default CommentsRoutes;
