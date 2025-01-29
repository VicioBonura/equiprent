import { useState, useEffect } from "react";
import { Equipment } from "../types/equipment";
import { getEquipments } from "../services/api";
import EquipmentFeatured from "../components/EquipmentFeatured/EquipmentFeatured";
import EquipmentList from "../components/EquipmentList/EquipmentList"; 
import "../assets/css/equipments.css";

const Equipments = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        getEquipments().then((equipments) => {

            //shuffle
            const shuffled = equipments.sort(() => Math.random() - 0.5);
            setEquipments(shuffled);
        });
    }, []);

    if (equipments.length === 0) {
        return <div className="loading">Caricamento...</div>;
    }

    const featured = equipments[0];
    const specialOffers = equipments.slice(1, 3);
    const rest = equipments.slice(3);
    return (
        <div className="page-container">
            <div className="equipments-list">
                <EquipmentFeatured equipment={featured} />
                <h3>Offerte speciali</h3>
                <div className="equipments-list__special-offers">
                    <EquipmentList equipments={specialOffers} />
                </div>
                <h3>Altre offerte</h3>
                <div className="equipments-list__rest">
                    <EquipmentList equipments={rest} />
                </div>
            </div>
        </div>
    );
}

export default Equipments;