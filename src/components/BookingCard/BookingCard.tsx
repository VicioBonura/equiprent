import { useEffect, useState } from "react";
import { EquipmentBookingProps } from "../../types/equipment";
import { formatSVG, placeholderImage, formatDateTime } from "../../utils/formatStrings";
import UseOptimizedImage from "../../hooks/useOptimizedImage";
import Card from "../Card/Card";
import "./BookingCard.css";

const BookingCard = ({ booking }: { booking: EquipmentBookingProps }) => {
    const [remainingMinutes, setRemainingMinutes] = useState(0);
    const { optimizedImage, isLoading } = UseOptimizedImage({
        src: booking.equipment.image,
        targetWidth: 300,
        quality: 0.8,
        format: 'image/webp'
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const endTime = new Date(booking.end_date).getTime();
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            setRemainingMinutes(Math.floor(timeLeft / 60000));
        }

        calculateTimeLeft();

        const interval = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(interval);
    }, [booking.end_date]);

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
                        <p className="booking-info__remaining-time">
                            Tempo rimanente: {remainingMinutes} minuti
                        </p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BookingCard;
