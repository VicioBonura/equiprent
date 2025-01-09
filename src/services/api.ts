import { LoginResponse, RegisterAndLoginRequest } from "../types/auth";

//const BACKUP_API_BASE_URL = "https://react-gym-server.onrender.com/api";
const API_BASE_URL = "https://d3660g9kardf5b.cloudfront.net/api";

export const loginUser = async (credentials: RegisterAndLoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Errore nel login");
    }

    return {token: data.token};
}

export const registerUser = async (credentials: RegisterAndLoginRequest): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.text();
    if (!response.ok) {
        throw new Error(data || "Errore nella registrazione");
    }

    return data;
}