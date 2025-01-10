import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './UserBtn.css';

const UserBtn = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const onLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <div id="user-info">
            {isAuthenticated ? (
                <Link to="#" className="btn" onClick={onLogout}>Logout</Link>
            ) : (
                <Link to="/login" className="btn">Login</Link>
            )}
        </div>
    );
}

export default UserBtn;