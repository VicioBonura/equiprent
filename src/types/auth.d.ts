export interface LoginResponse {
	token: string;
}

export interface RegisterAndLoginRequest {
	username: string;
	password: string;
}

export interface User {
	user_id: string; //token
	username: string;
}