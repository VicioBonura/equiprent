import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import Toast from '../components/Toast/Toast';

const Login = () => {
    const [searchParams] = useSearchParams();
    const isRedirect = searchParams.get('redirect') === 'true';
    return (
        <div className="center-content">
            {isRedirect && <Toast message="Effettua il login per accedere alle sezioni protette" type="warning" />}
            <LoginForm />
        </div>
    );
}

export default Login;