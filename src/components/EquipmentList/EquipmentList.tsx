import { Equipment } from "../../types/equipment";

import "./EquipmentList.css";
import EquipmentCard from "../EquipmentCard/EquipmentCard";

const EquipmentList = ({ equipments }: { equipments: Equipment[] }) => {

    return (
        equipments.map((eq: Equipment) => (
            <EquipmentCard key={eq.id} equipment={eq} />
        ))
    );
}

export default EquipmentList;