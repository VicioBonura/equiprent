import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useToast } from "../../contexts/ToastContext/ToastContext";
import { bookEquipment } from "../../services/api";
import { Equipment } from "../../types/equipment";
import { formatPrice } from "../../utils/formatStrings";
import "./BookingWidget.css";

interface BookingWidgetProps {
    equipment: Equipment;
}

enum DurationParams {
    MIN = 0,
    MAX = 20,
    DEFAULT_STEP = 1,
    QUICK_STEP = 5
}

const BookingWidget = ({ equipment }: BookingWidgetProps) => {
    const { getToken } = useAuth();
    const { showToast } = useToast();
    const [duration, setDuration] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Check if the duration is in the allowed range
     * @param duration - The duration to check
     * @returns True if the duration is in the allowed range, false otherwise
     */
    const isInRange = (duration: number) => {
        return duration >= DurationParams.MIN && duration <= DurationParams.MAX;
    }

    /**
     * Check if the increment button is disabled
     * @param quick - True if the button is a quick increment button, false otherwise
     * @returns True if the increment button is disabled, false otherwise
     */
    const isIncrementDisabled = (quick: boolean = false) => {
        const step = quick ? DurationParams.QUICK_STEP : DurationParams.DEFAULT_STEP;
        return duration + step > DurationParams.MAX;
    }

    /**
     * Check if the decrement button is disabled
     * @param quick - True if the button is a quick decrement button, false otherwise
     * @returns True if the decrement button is disabled, false otherwise
     */
    const isDecrementDisabled = (quick: boolean = false) => {
        const step = quick ? DurationParams.QUICK_STEP : DurationParams.DEFAULT_STEP;
        return duration - step < DurationParams.MIN;
    }

    /**
     * Update the duration
     * @param increment - True if the duration should be incremented, false otherwise
     * @param quick - True if the button is a quick increment button, false otherwise
     */
    const updateDuration = (increment: boolean = true, quick: boolean = false) => {
        const step = quick ? DurationParams.QUICK_STEP : DurationParams.DEFAULT_STEP;
        const newDuration = duration + (increment ? step : -step);
        if (!isInRange(newDuration)) {
            return;
        }
        setDuration(newDuration);
    }

    /**
     * Calculate the total price of the booking
     * @returns The final price
     */
    const calculatePrice = () => {
        return formatPrice(duration * equipment.pricePerMinute, 'EUR');
    }

    /**
     * Book the equipment
     */
    const onBooking = async () => {
        setIsLoading(true);
        const token = getToken();
        try {
            await bookEquipment({equipmentId: equipment.id, duration, token});
            showToast({
                message: 'Prenotazione effettuata con successo',
                type: 'success'
            });
        } catch (error) {
            showToast({ message: `Errore nella prenotazione: ${error}`, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`bookingWidget ${isLoading ? 'bookingWidget--loading' : ''}`}>
            <div className="bookingWidget__duration">
                <button 
                    onClick={() => updateDuration(false, true)} 
                    disabled={isDecrementDisabled(true)}
                >-5</button>
                <button 
                    onClick={() => updateDuration(false, false)} 
                    disabled={isDecrementDisabled(false)}
                >-1</button>
                <span>{duration + (duration != 1 ? ' minuti' : ' minuto')}</span>
                <button 
                    onClick={() => updateDuration(true, false)} 
                    disabled={isIncrementDisabled(false)}
                >+1</button>
                <button 
                    onClick={() => updateDuration(true, true)} 
                    disabled={isIncrementDisabled(true)}
                >+5</button>
            </div>
            <div className="bookingWidget__actions">
                <button 
                    onClick={onBooking}
                >Prenota: {calculatePrice()}!</button>
            </div>
        </div>
    );
}

export default BookingWidget;