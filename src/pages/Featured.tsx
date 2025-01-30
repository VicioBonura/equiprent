import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEquipmentDetail } from "../services/api";
import { Equipment } from "../types/equipment";
import EquipmentFeatured from "../components/EquipmentFeatured/EquipmentFeatured";
import Loader from "../components/Loader/Loader";
import "../assets/css/featured.css";

const EquipmentDetail = () => {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getEquipmentDetail(parseInt(id))
                .then((equipment) => setEquipment(equipment))
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!equipment) {
        return <div className="equipment-not-found">
            Attrezzatura non trovata
            <Link to="/equipments" className="button button--secondary">Visualizza tutte le attrezzature</Link>
        </div>;
    }

    return (
        <div className="page-container featured-equipment">
            <EquipmentFeatured equipment={equipment} />
            <div className="cta">
                <h2>Inizia subito il tuo allenamento</h2>
                <span>oppure</span>
                <Link to="/equipments" className="button button--secondary">Scegli un'altra attrezzatura</Link>
            </div>
        </div>
    );
};

export default EquipmentDetail;