import { useState, useEffect } from "react";
import { EquipmentBookingProps } from "../types/equipment";
import { getEquipmentsBooked } from "../services/api";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import BookingList from "../components/BookingCard/BookingList/BookingList";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import "../assets/css/dashboard.css";

const Dashboard = () => {
    const { getToken } = useAuth();
    const [equipmentsBooked, setEquipmensBooked] = useState<EquipmentBookingProps[]>([]);
    const [activeBookings, setActiveBookings] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        getEquipmentsBooked(getToken()).then((equipmentsBooked) => {
            setEquipmensBooked(equipmentsBooked);
            setActiveBookings(equipmentsBooked.length);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleExpire = () => {
        setActiveBookings(prev => prev - 1);
    }

    if (isLoading) {
        return <Loader />;
    }

    if(!isLoading && equipmentsBooked.length === 0 || activeBookings === 0) {
        return (
        <div className="loading-finished">
            Nessuna prenotazione trovata
            <Link to="/equipments" className="button button--secondary button--big">Inizia subito</Link>
        </div>
        );
    }

    return (
        
        <div className="page-container dashboard">
            <h2>Le tue prenotazioni</h2>
            <BookingList equipmentsBooked={equipmentsBooked} userBookings={true} onExpire={handleExpire} />
        </div>
    );
}

export default Dashboard;