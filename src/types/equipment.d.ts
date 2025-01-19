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
	start_date: string;
	end_date: string;
}

export interface EquipmentBookingProps extends EquipmentBooking {
    equipment: Equipment;
}

export interface EquipmentBookingRequest {
    equipmentId: number;
    duration: number;
    token: string | null;
}