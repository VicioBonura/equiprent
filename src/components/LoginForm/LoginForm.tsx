import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RegisterAndLoginRequest } from '../../types/auth';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useToast } from '../../contexts/ToastContext/ToastContext';
import Card from "../Card/Card";

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();

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
            await login(credentials);
            showToast({
                message: 'Login effettuato con successo',
                type: 'success'
            });
            navigate(route);
        } catch (error) {
            showToast({
                message: `Errore nel login: ${error}`,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Card className="card--form">
            <Card.Header>
                <h2>Login</h2>
            </Card.Header>
            <Card.Body>
                <form onSubmit={onSubmit}>
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
            </Card.Body>
            <Card.Footer>
                <p className="card__footerText">Non hai un account? <Link to="/register">Registrati</Link></p>
            </Card.Footer>
        </Card>
    )
}

export default LoginForm;