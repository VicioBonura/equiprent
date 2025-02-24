import { LoginResponse, RegisterAndLoginRequest } from "../types/auth";
import { Equipment, EquipmentBooking, EquipmentBookingProps, EquipmentBookingRequest } from "../types/equipment"

// API base URL
const API_BASE_URL = "https://d3660g9kardf5b.cloudfront.net/api";
//const BACKUP_API_BASE_URL = "https://react-gym-server.onrender.com/api";

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

    if(!response.ok) {
        const error = await response.text();
        throw new Error(error || "Errore nel login");
    }

    const data = await response.json();
    return data;
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

/**
 * Get equipment detail
 * @param id - The id of the equipment
 * @returns The equipment detail
 */
export const getEquipmentDetail = async (id: number): Promise<Equipment> => {
    const equipments = await getEquipments();
    const equipment = equipments.find((equipment: Equipment) => equipment.id === id);
    if(!equipment)
        throw new Error("Attrezzatura non trovata");
    return equipment;
}

/**
 * Get all bookings
 * @params token - The token of the user
 * @returns The bookings
 */
export const getBookings = async (token: string | null = null): Promise<EquipmentBooking[]> => {
    const headers: Record<string, string> = {
        "content-type": "application/json"
    };

    if(token)
        headers["Authorization"] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/equipment-bookings`, {
        headers
    });
    return response.json();
}

/**
 * Get equipments booked - if token is provided, get only the bookings of the user
 * @params token - The token of the user
 * @returns The equipments booked
 */
export const getEquipmentsBooked = async (token: string | null = null): Promise<EquipmentBookingProps[]> => {
    const bookings = await getBookings(token);
    const equipments = await getEquipments();

    const equipmentsBooked = bookings.map((booking: EquipmentBooking) => {
        const equipment = equipments.find((equipment: Equipment) => equipment.id === booking.equipment_id);
        if(!equipment)
            return null;
        return { ...booking, equipment: equipment as Equipment };
    }).filter((booking): booking is EquipmentBookingProps => booking !== null); //TSLint non accetta .filter(Boolean)
    return equipmentsBooked;
}

/**
 * Book an equipment
 * @param equipmentId - The id of the equipment to book
 * @param duration - The duration of the booking
 * @param token - The token of the user
 * @returns The booking
 */
export const bookEquipment = async ({equipmentId, duration, token}: EquipmentBookingRequest): Promise<EquipmentBooking> => {
    const headers: Record<string, string> = {
        "content-type": "application/json"
    };

    if(token)
        headers["Authorization"] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/book`, {
        method: "POST",
        headers,
        body: JSON.stringify({ duration }) 
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Errore nella prenotazione");
    }

    const rawData = await response.text();
    let data;
    try { data = JSON.parse(rawData); }
    catch { data = rawData; }

    if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : "Errore nella prenotazione");
    }

    return data;
}