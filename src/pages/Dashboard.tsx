import { useState, useEffect } from "react";
import { EquipmentBookingProps } from "../types/equipment";
import { getEquipmentsBooked } from "../services/api";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import BookingList from "../components/BookingCard/BookingList/BookingList";
import "../assets/css/dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { getToken } = useAuth();
    const [equipmentsBooked, setEquipmensBooked] = useState<EquipmentBookingProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getEquipmentsBooked(getToken()).then((equipmentsBooked) => {
            setEquipmensBooked(equipmentsBooked);
        });
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div className="loading">Caricamento...</div>;
    }

    if(!isLoading && equipmentsBooked.length === 0) {
        return <div className="loading-finished">
            Nessuna prenotazione trovata
            <Link to="/equipments" className="button button--secondary button--big">Inizia subito</Link>
        </div>;
    }

    return (
        <div className="page-container dashboard">
            <h2>Le tue prenotazioni</h2>
            <BookingList equipmentsBooked={equipmentsBooked} userBookings={true} />
        </div>
    );
}

export default Dashboard;