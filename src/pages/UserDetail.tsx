import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

// Defina a interface para o tipo User
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

const UserDetail: React.FC = () => {
    // Captura o parâmetro `id` da URL
    const { id } = useParams<{ id: string }>();

    // Estado para armazenar os dados do usuário
    const [user, setUser] = useState<User | null>(null);

    // Estado para controlar o modo de edição
    const [isEditing, setIsEditing] = useState(false);

    // Estado para armazenar os dados do formulário de edição
    const [formData, setFormData] = useState<User>({
        id: 0,
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    // Hook para navegação
    const navigate = useNavigate();

    // Função para buscar os detalhes do usuário
    const fetchUser = async () => {
        try {
            const response = await axios.get<User>(`/users/${id}`);
            setUser(response.data);
            setFormData(response.data); // Preenche o formulário com os dados do usuário
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    };

    // Função para atualizar os dados do usuário
    const handleUpdateUser = async () => {
        try {
            await axios.put(`/users/${id}`, formData);
            setIsEditing(false); // Sai do modo de edição
            fetchUser(); // Atualiza os dados exibidos
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    // Função para deletar o usuário
    const handleDeleteUser = async () => {
        try {
            await axios.delete(`/users/${id}`);
            navigate('/users'); // Redireciona para a lista de usuários após a exclusão
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    // Efeito para buscar os dados do usuário quando o componente é montado
    useEffect(() => {
        fetchUser();
    }, [id]);

    // Se o usuário ainda não foi carregado, exibe uma mensagem de carregamento
    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes do Usuário</h1>

            {isEditing ? (
                // Modo de edição
                <div>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Telefone:
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </label>
                    <br />
                    <button onClick={handleUpdateUser}>Salvar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                // Modo de visualização
                <div>
                    <p>
                        <strong>Nome:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Telefone:</strong> {user.phone}
                    </p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={handleDeleteUser}>Deletar</button>
                </div>
            )}
            <Link to={`/`}>Home</Link>
        </div>
    );
};

export default UserDetail;