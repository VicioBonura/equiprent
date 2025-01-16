import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { RegisterAndLoginRequest } from "../../types/auth";
import { useToast } from "../../contexts/ToastContext/ToastContext";
import Card from "../Card/Card";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.currentTarget as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if(!username.length || !password.length) {
            showToast({ 
                message: 'I campi sono obbligatori', 
                type: 'error'
            });
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            showToast({ 
                message: 'Le password non corrispondono', 
                type: 'error'
            });
            setIsLoading(false);
            return;
        }

        const credentials: RegisterAndLoginRequest = {
            username: form.username.value,
            password: form.password.value
        };

        try {
            await registerUser(credentials);
            showToast({ 
                message: `Registrazione effettuata con successo`, 
                type: 'success'
            });
            navigate('/login?registered=true');
        } catch (error) {
            showToast({ 
                message: `Errore nella registrazione: ${error}`, 
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Card className="card--form">
            <Card.Header><h2>Registrazione</h2></Card.Header>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Ripeti Pass</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Conferma Password" />
                    </div>
                    <div className="form-group form-group--buttons">
                        <button type="reset">Reset</button>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Registrati'}</button>
                    </div>
                </form>
            </Card.Body>
            <Card.Footer>
                <p className="card__footerText">Hai già un account? <Link to="/login">Accedi</Link></p>
            </Card.Footer>
        </Card>
    )
}

export default RegisterForm;