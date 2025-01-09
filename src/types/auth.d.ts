export interface LoginResponse {
	token: string;
}

export interface RegisterAndLoginRequest {
	username: string;
	password: string;
}