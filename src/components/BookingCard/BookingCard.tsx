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
                    <div className="booking-info__icon" dangerouslySetInnerHTML={{ __html: formatSVG(booking.equipment.icon) }} />
                    <div className="booking-info__name">
                         {booking.equipment.name}
                    </div>
                    <div className="booking-info__duration">
                        <p><span>dalle</span>: <span className="booking-info__duration-date">{formatDateTime(booking.start_date)}</span></p>
                        <p><span>alle</span>: <span className="booking-info__duration-date">{formatDateTime(booking.end_date)}</span></p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BookingCard;
