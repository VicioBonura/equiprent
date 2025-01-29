import { useEffect, useState } from "react";
import "./Counter.css";

interface CounterProps {
    endDate: string;
    onExpire?: () => void;
}

const Counter = ({ endDate, onExpire }: CounterProps) => {
    const [remainingMinutes, setRemainingMinutes] = useState(0);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const endTime = new Date(endDate).getTime();
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            
            if(timeLeft < 0) {
                setIsExpired(true);
                onExpire?.();
            }
            
            setRemainingMinutes(Math.floor(timeLeft / 60000) + 1);
        }

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(interval);
    }, [endDate, onExpire]);

    if(isExpired) return null;

    return (
        <div className="booking-info__remaining-time">
            <span className="label">Tempo rimanente</span>
            <span className="value">{remainingMinutes} minut{remainingMinutes === 1 ? 'o' : 'i'}</span>
        </div>
    );
}

export default Counter;