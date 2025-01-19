import { Equipment } from "../../types/equipment";
import { formatSVG, formatPrice, placeholderImage } from "../../utils/formatStrings";
import Card from "../Card/Card";
import BookingWidget from "../BookingWidget/BookingWidget";
import UseOptimizedImage from "../../hooks/useOptimizedImage";
import "./EquipmentCard.css";

const EquipmentCard = ({ equipment }: { equipment: Equipment }) => {

    const { optimizedImage, isLoading } = UseOptimizedImage({
        src: equipment.image,
        targetWidth: 600,
        quality: 0.8,
        format: 'image/webp'
    });

    return (
        <Card key={equipment.id}>
            <Card.Header>
                <h3><div dangerouslySetInnerHTML={{ __html: formatSVG(equipment.icon) }} /> {equipment.name}</h3>
            </Card.Header>
            <Card.Body className={isLoading ? 'img-loading' : ''}>
                <img 
                    src={optimizedImage ?? placeholderImage(600, 400)} 
                    alt={equipment.name} 
                />
                <p>{equipment.claim}</p>
                <div>{formatPrice(equipment.pricePerMinute, 'EUR')}/min</div>
            </Card.Body>
            <Card.Footer>
                <BookingWidget equipment={equipment} />
            </Card.Footer>
        </Card>
    );
}

export default EquipmentCard;