import { createContext, useContext } from 'react';
import { AuthContextType } from '../../types/auth';

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    token: null,
    login: () => Promise.resolve(),
    checkLogin: () => {},
    logout: () => {}
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Context not found');
    }
    return context;
}

export default AuthContext;