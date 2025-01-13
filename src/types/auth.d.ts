export interface LoginResponse {
	token: string;
}

export interface RegisterAndLoginRequest {
	username: string;
	password: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    updateLogin: (token: string) => void;
    logout: () => void;
}

export interface User {
    id: string;
    username: string;
 }
