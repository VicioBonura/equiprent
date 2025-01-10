import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser} from '../../services/api';
import { RegisterAndLoginRequest } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    //check if the user is redirected from a protected route
    const [searchParams] = useSearchParams();
    const route = searchParams.get('from') || '/';
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.currentTarget as HTMLFormElement;
        const credentials: RegisterAndLoginRequest = {
            username: form.username.value,
            password: form.password.value
        };

        try {
            const response = await loginUser(credentials);
            login(response.token);
            navigate(route);
        } catch (error) {
            setError('Credenziali non valide');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="card card--form">
            <div className="card__header"><h2>Login</h2></div>
            <div className="card__body">
                <form onSubmit={onSubmit}>
                {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="username">User</label>
                        <input type="text" id="username" name="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Pass</label>
                        <input type="password" id="password" name="password" placeholder="Password" />
                    </div>
                    <div className="form-group form-group--buttons">
                        <button type="reset">Reset</button>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Accedi'}</button>
                    </div>
                </form>
            </div>
            <div className="card__footer">
                <p className="card__footer-text">Non hai un account? <Link to="/register">Registrati</Link></p>
            </div>
        </div>
    )
}

export default LoginForm;