import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useToast } from '../../contexts/ToastContext/ToastContext';
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
                <Link to="/" className="btn" onClick={onLogout}>Logout</Link>
            ) : (
                <Link to="/login" className="btn">Login</Link>
            )}
        </div>
    );
}

export default UserBtn;