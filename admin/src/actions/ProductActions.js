import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_SUCCESS } from '../constants/productConstants';

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        await axios.delete(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: productId });
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
