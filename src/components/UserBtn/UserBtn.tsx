import { useNavigate, Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/auth';
import './UserBtn.css';

const UserBtn = () => {
    const navigate = useNavigate();
    const onLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <div id="user-info">
            {isLoggedIn() ? (
                <Link to="#" className="btn" onClick={onLogout}>Logout</Link>
            ) : (
                <Link to="/login" className="btn">Login</Link>
            )}
        </div>
    );
}

export default UserBtn;