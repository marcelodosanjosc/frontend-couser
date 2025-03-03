// components/Product/ProductForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProductById } from '../../store/slices/productSlice';
import { Product } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {AppDispatch} from "../../store/store";

interface ProductFormProps {
    product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Product>({
        id: product?.id || 0,
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        imgUrl: product?.imgUrl || '',
        categories: product?.categories || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (product) {
            dispatch(updateProductById(formData));
        } else {
            dispatch(addProduct(formData));
        }
        navigate('/products');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Formulario</h1>
            <label>
                Nome:
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </label>
            <label>
                Descrição:
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </label>
            <label>
                Preço:
                <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
            </label>
            <label>
                URL da Imagem:
                <input
                    type="file"
                    value={formData.imgUrl}
                    onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                />
            </label>
            <button type="submit">{product ? 'Atualizar' : 'Criar'}</button>
        </form>
    );
};

export default ProductForm;