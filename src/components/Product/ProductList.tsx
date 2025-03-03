// components/Product/ProductList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import {AppDispatch, RootState} from '../../store/store';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.items);
    const status = useSelector((state: RootState) => state.products.status);
    const error = useSelector((state: RootState) => state.products.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <strong>{product.name}</strong> -
                        <Link to={`/products/${product.id}`}>
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;