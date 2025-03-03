import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserById } from '../../store/slices/userSlice';
import { User } from '../../store/slices/userSlice';
import { AppDispatch } from "../../store/store";

interface UserFormProps {
    user: User;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<User>(user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserById(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <button type="submit">Update</button>
        </form>
    );
};

export default UserForm;