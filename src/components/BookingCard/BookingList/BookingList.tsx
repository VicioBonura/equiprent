import { EquipmentBookingProps } from "../../../types/equipment";
import BookingCard from "../BookingCard";
import "./BookingList.css";

const BookingList = ({equipmentsBooked}: {equipmentsBooked: EquipmentBookingProps[]}) => {

    return (
        equipmentsBooked.map((booking: EquipmentBookingProps) => (
            <BookingCard key={booking.id} booking={booking} />
        ))
    );
}

export default BookingList;
