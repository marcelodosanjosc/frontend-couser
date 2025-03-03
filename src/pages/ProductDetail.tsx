// components/Product/ProductDetail.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import {AppDispatch, RootState} from '../store/store';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector((state: RootState) => state.products.selectedProduct);
    const status = useSelector((state: RootState) => state.products.status);
    const error = useSelector((state: RootState) => state.products.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <img src={product.imgUrl} alt={product.name} />
            <h3>Categorias:</h3>
            <ul>
                {product.categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetail;