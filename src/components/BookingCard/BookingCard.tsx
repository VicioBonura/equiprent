import { EquipmentBookingProps } from "../../types/equipment";
import { formatSVG, placeholderImage, formatDateTime } from "../../utils/formatStrings";
import UseOptimizedImage from "../../hooks/useOptimizedImage";
import Card from "../Card/Card";
import "./BookingCard.css";

const BookingCard = ({ booking }: { booking: EquipmentBookingProps }) => {
    const { optimizedImage, isLoading } = UseOptimizedImage({
        src: booking.equipment.image,
        targetWidth: 300,
        quality: 0.8,
        format: 'image/webp'
    });

    return (
        <Card>
            <Card.Body className={isLoading ? 'img-loading' : ''}>
                <img 
                    src={optimizedImage ?? placeholderImage(300, 200)} 
                    alt={booking.equipment.name} 
                />
                <div className="booking-info">
                    <div className="booking-info__name">
                        <div dangerouslySetInnerHTML={{ __html: formatSVG(booking.equipment.icon) }} /> {booking.equipment.name}
                    </div>
                    <div className="booking-info__duration">
                        <p>DA: {formatDateTime(booking.start_date)}</p>
                        <p>A: {formatDateTime(booking.end_date)}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BookingCard;
