import { useState } from 'react';

interface useAuthReturn {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuth = (): useAuthReturn => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('token') !== null;
    });

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    return { isAuthenticated, login, logout };
}