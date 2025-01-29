import { useState } from "react";
import { EquipmentBookingProps } from "../../types/equipment";
import { formatSVG, placeholderImage, formatDateTime } from "../../utils/formatStrings";
import UseOptimizedImage from "../../hooks/useOptimizedImage";
import Card from "../Card/Card";
import Counter from "./Counter/Counter";
import "./BookingCard.css";

interface BookingCardProps {
    booking: EquipmentBookingProps;
    onExpire?: () => void;
}

const BookingCard = ({ booking, onExpire }: BookingCardProps) => {
    const [isExpired, setIsExpired] = useState(false);
    const { optimizedImage, isLoading } = UseOptimizedImage({
        src: booking.equipment.image,
        targetWidth: 600,
        quality: 0.8,
        format: 'image/webp'
    });

    const handleExpire = () => {
        setIsExpired(true);
        onExpire?.();
    }

    if(isExpired) return null;

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
                        <Counter endDate={booking.end_date} onExpire={handleExpire} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BookingCard;
