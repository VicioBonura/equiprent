import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { showToast } from '../utils/toast';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    const [searchParams] = useSearchParams();
    const isRedirect = searchParams.get('redirect') === 'true';

    useEffect(() => {
        if (isRedirect) {
            showToast({ 
                message: "Effettua il login per accedere alle sezioni protette", 
                type: "warning"
            });
        }
    }, [isRedirect]);

    return (
        <div className="center-content">
            <LoginForm />
        </div>
    );
}

export default Login;