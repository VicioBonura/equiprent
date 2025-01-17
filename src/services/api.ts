import { LoginResponse, RegisterAndLoginRequest } from "../types/auth";
import { Equipment } from "../types/equipment"

//const BACKUP_API_BASE_URL = "https://react-gym-server.onrender.com/api";
const API_BASE_URL = "https://d3660g9kardf5b.cloudfront.net/api";

// Authentication

/**
 * Login user
 * @param credentials - The credentials of the user
 * @returns The token of the user
 */
export const loginUser = async (credentials: RegisterAndLoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const rawData = await response.text();
    let data;
    try { data = JSON.parse(rawData); }
    catch { data = rawData; }

    if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : "Errore nel login");
    }

    return {token: data.token};
}

/**
 * Register user
 * @param credentials - The credentials of the user
 * @returns The token of the user
 */
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

// Equipments

/**
 * Get all equipments
 * @returns The equipments
 */
export const getEquipments = async (): Promise<Equipment[]> => {
    const response = await fetch(`${API_BASE_URL}/equipment`);
    return response.json();
}