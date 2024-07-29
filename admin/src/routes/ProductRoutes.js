import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../components/dashboard/product/ProductList';
import ProductForm from '../components/dashboard/product/ProductForm';

const ProductRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/products" exact component={ProductList} />
            <Route path="/admin/products/add" exact component={() => <ProductForm isUpdate={false} />} />
            <Route path="/admin/products/edit/:productId" exact component={(props) => <ProductForm isUpdate={true} productId={props.match.params.productId} />} />
        </Routes>
    );
};

export default ProductRoutes;
