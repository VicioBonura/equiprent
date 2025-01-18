import { useState, useEffect } from "react";
import { getEquipments } from "../../services/api";
import { Equipment } from "../../types/equipment";
import { formatSVG, formatPrice } from "../../utils/formatStrings";
import Card from "../Card/Card";
import BookingWidget from "../BookingWidget/BookingWidget";
import "./EquipmentList.css";

const EquipmentList = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        getEquipments().then((equipments) => {

            //shuffle
            const shuffled = equipments.sort(() => Math.random() - 0.5);
            setEquipments(shuffled);
        });
    }, []);

    if (equipments.length === 0) {
        return <div>Loading...</div>;
    }

    const [featured, ...rest] = equipments;

    return <div className="equipments-list">
        <div className="equipments-list__featured">
            <Card key={featured.id}>
                <Card.Header>
                    <h3><div dangerouslySetInnerHTML={{ __html: formatSVG(featured.icon) }} /> {featured.name}</h3>
                </Card.Header>
                <Card.Body>
                    <img src="https://placehold.co/600x400" alt={featured.name} />
                    <p>{featured.claim}</p>
                    <div>{formatPrice(featured.pricePerMinute, 'EUR')}/min</div>
                </Card.Body>
                <Card.Footer>
                    <BookingWidget equipment={featured} />
                </Card.Footer>
            </Card>
        </div>
        <div className="equipments-list__rest">
            {
                rest.map((eq: Equipment) => (
                    <Card key={eq.id}>
                    <Card.Header>
                        <h3><div dangerouslySetInnerHTML={{ __html: formatSVG(eq.icon) }} /> {eq.name}</h3>
                    </Card.Header>
                    <Card.Body>
                        <img src="https://placehold.co/600x400" alt={eq.name} />
                        <p>{eq.claim}</p>
                        <div>{formatPrice(eq.pricePerMinute, 'EUR')}/min</div>
                    </Card.Body>
                    <Card.Footer>
                        <BookingWidget equipment={eq} />
                    </Card.Footer>
                    </Card>
                ))
            }
        </div>
    </div>;
}

export default EquipmentList;