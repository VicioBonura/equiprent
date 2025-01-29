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

    const [price, currency] = formatPrice(equipment.pricePerMinute, 'EUR');

    return (
        <div className={`equipments-list__featured ${isLoading ? 'img-loading' : ''}`}>
            <img src={optimizedImage ?? placeholderImage(600, 400)} alt={equipment.name} />
            <div className="equipments-list__featured-info">
                <p className="claim">{equipment.claim}</p>
                <h3><div dangerouslySetInnerHTML={{ __html: formatSVG(equipment.icon) }} /> {equipment.name}</h3>
                <div className="equipments-list__featured-info-price">
                    <span className="price">{price}</span>
                    <span className="currency">{currency}/min</span>
                </div>
            </div>
            <BookingWidget equipment={equipment} />
        </div>
    );
}

export default EquipmentFeatured;