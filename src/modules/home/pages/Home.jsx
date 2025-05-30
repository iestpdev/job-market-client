import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../../auth/atoms/authAtom';

export const HomePage = () => {
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setAuth({ isAuthenticated: false, token: null, user: null });
        navigate("/login");
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};
