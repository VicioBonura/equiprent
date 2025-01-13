import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, RegisterAndLoginRequest } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const updateLogin = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            updateLogin(token);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{isAuthenticated, updateLogin, logout}}>
            {children}
        </AuthContext.Provider>
    );
};