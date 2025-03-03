import React from "react";
import UserList from "../components/User/UserList";
import ProductList from "../components/Product/ProductList";
import ProductForm from "../components/Product/ProductForm";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Bem-vindo à Página Inicial</h1>
            <UserList />
            <ProductList />
            <ProductForm />
        </div>
    );

};
export default Home;