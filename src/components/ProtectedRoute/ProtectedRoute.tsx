import { Navigate, useLocation } from 'react-router-dom'
import { ProtectedRouteProps } from '../../types/access';
import { isLoggedIn } from '../../utils/auth';

const ProtectedRoute = ({children, accessType}: ProtectedRouteProps) => {
    const isAuth = isLoggedIn();
    const location = useLocation();

    switch (accessType) {
        case 'not-auth':    //Access only if not authenticated
            return !isAuth ? <>{children}</> : <Navigate to="/dashboard" />;

        case 'auth-only':   //Access only if authenticated
            const from = encodeURIComponent(location.pathname);
            return isAuth ? <>{children}</> : <Navigate to={`/login?redirect=true&from=${from}`} replace />;

        case 'public':      //Access allowed to all
        default:
            return <>{children}</>;
    }
}

export default ProtectedRoute;