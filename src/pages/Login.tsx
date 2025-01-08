import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    const [searchParams] = useSearchParams();
    const isRedirect = searchParams.get('redirect') === 'true';
    return (
        <div className="center-content">
            {isRedirect && <div className="alert alert-warning">Effettua il login per accedere alle sezioni protette</div>}
            <LoginForm />
        </div>
    );
}

export default Login;