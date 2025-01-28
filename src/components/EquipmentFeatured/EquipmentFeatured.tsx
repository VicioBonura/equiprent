import { Equipment } from "../../types/equipment";
import { formatSVG, formatPrice, placeholderImage } from "../../utils/formatStrings";
import BookingWidget from "../BookingWidget/BookingWidget";
import UseOptimizedImage from "../../hooks/useOptimizedImage";
import "./EquipmentFeatured.css";

const EquipmentFeatured = ({ equipment }: { equipment: Equipment }) => {

    const { optimizedImage, isLoading } = UseOptimizedImage({
        src: equipment.image,
        targetWidth: 600,
        quality: 0.8,
        format: 'image/webp'
    });

    return (
        <div className={`equipments-list__featured ${isLoading ? 'img-loading' : ''}`}>
            <img src={optimizedImage ?? placeholderImage(600, 400)} alt={equipment.name} />
            <div className="equipments-list__featured-info">
                <h3><div dangerouslySetInnerHTML={{ __html: formatSVG(equipment.icon) }} /> {equipment.name}</h3>
                <p>{equipment.claim}</p>
                <div className="equipments-list__featured-info-price">{formatPrice(equipment.pricePerMinute, 'EUR')}/min</div>
            </div>
            <BookingWidget equipment={equipment} />
        </div>
    );
}

export default EquipmentFeatured;