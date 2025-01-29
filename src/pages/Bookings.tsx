import { useState, useEffect } from "react";
import { EquipmentBookingProps } from "../types/equipment";
import { getEquipmentsBooked } from "../services/api";
import BookingList from "../components/BookingCard/BookingList/BookingList";
import "../assets/css/bookings.css";

const Bookings = () => {
    const [equipmentsBooked, setEquipmensBooked] = useState<EquipmentBookingProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getEquipmentsBooked().then((equipmentsBooked) => {
            setEquipmensBooked(equipmentsBooked);
        });
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div className="loading">Caricamento...</div>;
    }

    if(!isLoading && equipmentsBooked.length === 0) {
        return <div className="loading-finished">Nessuna prenotazione trovata</div>;
    }

    return (
        <div className="page-container">
            <h2>Attrezzature prenotate</h2>
            <BookingList equipmentsBooked={equipmentsBooked} userBookings={false} />
        </div>
    );
}

export default Bookings;