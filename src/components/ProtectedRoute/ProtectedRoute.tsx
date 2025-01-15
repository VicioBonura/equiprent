import { Navigate } from 'react-router-dom'
import { ProtectedRouteProps } from '../../types/access';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const ProtectedRoute = ({children, accessType}: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();

    switch (accessType) {
        case 'not-auth':    //Access only if not authenticated
            return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;

        case 'auth-only':   //Access only if authenticated
            return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;

        case 'public':      //Access allowed to all
        default:
            return <>{children}</>;
    }
}

export default ProtectedRoute;