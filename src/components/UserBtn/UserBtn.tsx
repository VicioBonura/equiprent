import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useToast } from '../../contexts/ToastContext/ToastContext';
import { Login } from '../Icons/Login'
import { Logout } from '../Icons/Logout'
import './UserBtn.css';

const UserBtn = () => {
    const { logout, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    
    const onLogout = () => {
        logout();
        showToast({
            message: 'Logout effettuato con successo',
            type: 'success'
        });
    }

    return (
        <div id="user-info">
            {isAuthenticated ? (
                <Link to="/" onClick={onLogout}>
                    <Logout />
                    <label>Logout</label>
                </Link>
            ) : (
                <Link to="/login">
                    <Login />
                    <label>Login</label>
                </Link>
            )}
        </div>
    );
}

export default UserBtn;