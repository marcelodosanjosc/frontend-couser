import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/slices/userSlice';
import { RootState, AppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.items);
    const status = useSelector((state: RootState) => state.users.status);


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong>  -
                        <Link to={`/users/${user.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;