import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { RegisterAndLoginRequest } from "../../types/auth";
import { showToast } from "../../utils/toast";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
        <div className="card card--form">
            <div className="card__header"><h2>Registrazione</h2></div>
            <div className="card__body">
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
            </div>
            <div className="card__footer">
                <p className="card__footer-text">Hai già un account? <Link to="/login">Accedi</Link></p>
            </div>
        </div>
    )
}

export default RegisterForm;