import { Equipment, EquipmentBookingProps } from "../../../types/equipment";
import { formatSVG } from "../../../utils/formatStrings";
import BookingCard from "../BookingCard";
import "./BookingList.css";

const BookingList = ({equipmentsBooked, userBookings}: {
    equipmentsBooked: EquipmentBookingProps[], userBookings: boolean
    }) => {
    
    //show only user bookings
    if(userBookings) {
        return (
            equipmentsBooked.map((booking: EquipmentBookingProps) => (
                <BookingCard key={booking.id} booking={booking} />
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
                <span className="count">{booking.count}</span> 
                <div dangerouslySetInnerHTML={{ __html: formatSVG(booking.equipment.icon) }} /> {booking.equipment.name}
            </li>
        ));
            
    return (
        <ul className="booking-count-list">{sortedBookings}</ul>
    );
}

export default BookingList;
