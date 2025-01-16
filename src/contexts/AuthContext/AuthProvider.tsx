import { useState, PropsWithChildren } from 'react';
import AuthContext from './AuthContext';
import { AuthState, User } from '../../types/auth';
import {jwtDecode} from 'jwt-decode';
import { loginUser } from '../../services/api';
import { RegisterAndLoginRequest } from '../../types/auth';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState<AuthState>(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const decoded = jwtDecode<User>(token);
            return {
                user: decoded,
                isAuthenticated: true,
                token: token,
            };
        }
        return {
            user: null,
            isAuthenticated: false,
            token: null,
        };
    });

    const login = async (credentials: RegisterAndLoginRequest) => {
        const {token} = await loginUser(credentials);
        localStorage.setItem('token', token);
        setState({
            user: jwtDecode<User>(token),
            isAuthenticated: true,
            token: token,
        });
    }

    const logout = () => {
        localStorage.removeItem('token');
        setState({
            user: null,
            isAuthenticated: false,
            token: null,
        });
    }

    const checkLogin = () => {
        const token = localStorage.getItem('token');
        return token ? true : false;
    }

    return (
        <AuthContext.Provider value={{...state, login, logout, checkLogin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;