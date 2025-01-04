export interface Equipment {
    id: number;
    name: string;
    claim: string;
    icon: string;
    image: string;
    pricePerMinute: number;
}

export interface EquipmentBooking {
	id: number;
	equipment_id: number;
	user_id: string;
	start_date: string;
	end_date: string;
}

export interface EquipmentBookingRequest {
	duration: number;
}