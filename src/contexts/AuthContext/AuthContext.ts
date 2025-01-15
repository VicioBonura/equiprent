import { createContext, useContext } from 'react';
import { AuthContextType } from '../../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Context not found');
    }
    return context;
}

export default AuthContext;