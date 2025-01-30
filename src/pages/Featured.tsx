import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEquipmentDetail } from "../services/api";
import { Equipment } from "../types/equipment";
import EquipmentFeatured from "../components/EquipmentFeatured/EquipmentFeatured";
import Loader from "../components/Loader/Loader";

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
        return <div>Attrezzatura non trovata</div>;
    }

    return (
        <div className="page-container">
            <EquipmentFeatured equipment={equipment} />
        </div>
    );
};

export default EquipmentDetail;