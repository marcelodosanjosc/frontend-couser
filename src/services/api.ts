import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    categories: Category[];
}

export interface Category {
    id: number;
    name: string;
}

export const getUsers = async (): Promise<{ data: User[] }> => {
    return api.get('/users');
};

export const getUserById = async (id: number): Promise<{ data: User }> => {
    return api.get(`/users/${id}`);
};

export const updateUser = async (id: number, user: User): Promise<{ data: User }> => {
    return api.put(`/users/${id}`, user);
};

export const deleteUser = async (id: number): Promise<void> => {
    return api.delete(`/users/${id}`);
};

export const createUser = async (user: User): Promise<{ data: User }> => {
    return api.post('/users', user);
};

// Adicione mais endpoints conforme necessário
export const getProducts = async (): Promise<{ data: Product[] }> => {
    return api.get('/products');
};

export const getProductById = async (id: number): Promise<{ data: Product }> => {
    return api.get(`/products/${id}`);
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<{ data: Product }> => {
    return api.post('/products', product);
};

export const updateProduct = async (id: number, product: Product): Promise<{ data: Product }> => {
    return api.put(`/products/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
    return api.delete(`/products/${id}`);
};

export const getCategories = async (): Promise<{ data: Category[] }> => {
    return api.get('/categories');
};
