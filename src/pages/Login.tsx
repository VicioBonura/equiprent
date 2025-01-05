import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    // Controllo utente già loggato
    // XXX: centralizzare usando ProtectedRoute
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [navigate]); 

    return (
        <div className="center-content">
            <LoginForm />
        </div>
    );
}

export default Login;