import { Link } from "react-router-dom";
import { Equipment, EquipmentBookingProps } from "../../../types/equipment";
import { formatSVG } from "../../../utils/formatStrings";
import BookingCard from "../BookingCard";
import "./BookingList.css";

interface userBookingsProps {
    equipmentsBooked: EquipmentBookingProps[];
    userBookings: boolean;
    onExpire?: () => void;
}

const BookingList = ({equipmentsBooked, userBookings, onExpire}: userBookingsProps) => {
    
    //show only user bookings
    if(userBookings) {
        return (
            equipmentsBooked.map((booking: EquipmentBookingProps) => (
                <BookingCard key={booking.id} booking={booking} onExpire={onExpire} />
            ))
        );
    }

    const bookingCount = equipmentsBooked.reduce((acc: {
            [key: number]: { equipment: Equipment, count: number } 
        }, booking: EquipmentBookingProps) => {
        const equipmentId = booking.equipment.id;
        if(!acc[equipmentId]) {
            acc[equipmentId] = {
                equipment: booking.equipment,
                count: 0
            };
        };
        acc[equipmentId].count++;
        return acc;
    }, {});

    const sortedBookings = Object.entries(bookingCount)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([equipmentId, booking]) => (
            <li key={equipmentId}>
                <Link to={`/featured/${booking.equipment.id}`}>
                    <span className="count">{booking.count}</span> 
                    <div dangerouslySetInnerHTML={{ __html: formatSVG(booking.equipment.icon) }} /> {booking.equipment.name}
                </Link>
            </li>
        ));
            
    return (
        <ul className="booking-count-list">{sortedBookings}</ul>
    );
}

export default BookingList;
