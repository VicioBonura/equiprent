import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from '../../services/api';
import { RegisterAndLoginRequest } from '../../types/auth';
import { showToast } from '../../utils/toast';
import { AuthContext } from '../../contexts/authContext';
import Card from "../Card/Card";

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
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
            AuthContext.updateLogin(response.token);

            // Trigger an event to notify components that the user is logged in
            window.dispatchEvent(new Event('auth-change'));
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