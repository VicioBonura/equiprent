export interface LoginResponse {
	token: string;
}

export interface RegisterAndLoginRequest {
	username: string;
	password: string;
}

export interface User {
    username: string;
    iat: number;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
}

interface AuthContextType extends AuthState {
    login: (credentials: RegisterAndLoginRequest) => Promise<void>;
    getToken: () => string | null;
    logout: () => void;
}
