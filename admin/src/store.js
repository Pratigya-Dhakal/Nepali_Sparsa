// admin/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import adminCategoryReducer from '../src/components/slices/adminCategorySlice';
import adminSubcategoryReducer from '../src/components/slices/adminSubcategorySlice';
import adminProductReducer from '../src/components/slices/adminProductSlice';
import adminCommentReducer from '../src/components/slices/adminCommentSlice';
import adminUserReducer from '../src/components/slices/adminUserSlice';

const store = configureStore({
    reducer: {
        adminCategory: adminCategoryReducer,
        adminSubcategory: adminSubcategoryReducer,
        adminProduct: adminProductReducer,
        adminComment: adminCommentReducer,
        adminUser: adminUserReducer,
    },
});

export default store;
