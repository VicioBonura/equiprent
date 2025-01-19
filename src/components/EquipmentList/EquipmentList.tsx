import { Equipment } from "../../types/equipment";
import EquipmentCard from "../EquipmentCard/EquipmentCard";
import "./EquipmentList.css";

const EquipmentList = ({ equipments }: { equipments: Equipment[] }) => {

    return (
        equipments.map((eq: Equipment) => (
            <EquipmentCard key={eq.id} equipment={eq} />
        ))
    );
}

export default EquipmentList;