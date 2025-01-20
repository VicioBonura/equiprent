import { useState, useEffect } from "react";
import { Equipment, EquipmentBooking, EquipmentBookingProps } from "../types/equipment";
import { getBookings, getEquipments } from "../services/api";
import { useToast } from "../contexts/ToastContext/ToastContext";
import BookingList from "../components/BookingCard/BookingList/BookingList";
import "../assets/css/bookings.css";

const Bookings = () => {
    const [bookings, setBookings] = useState<EquipmentBooking[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [bookings, equipments] = await Promise.all([getBookings(), getEquipments()]);
                setBookings(bookings);
                setEquipments(equipments);
            } catch (error) {
                showToast({
                    message: `Errore nel recupero dei dati: ${error}`,
                    type: "error"
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(!isLoading && bookings.length === 0) {
        return <div>Nessuna prenotazione trovata</div>;
    }

    const equipmentsBooked = bookings.map((booking: EquipmentBooking) => {
        const equipment = equipments.find((equipment: Equipment) => equipment.id === booking.equipment_id);
        if(!equipment)
            return null;
        return { ...booking, equipment: equipment as Equipment };
    }).filter((booking): booking is EquipmentBookingProps => booking !== null); //TSLint non accetta .filter(Boolean)

    return (
        <div className="page-container">
            <h2>Attrezzature prenotate</h2>
            <BookingList equipmentsBooked={equipmentsBooked} />
        </div>
    );
}

export default Bookings;