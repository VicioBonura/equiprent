import { useState, useEffect } from 'react';
import { ToastProps } from '../../types/toast';
import './Toast.css';

const Toast = ({message, type, duration = 5000, onClose = () => {}}: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    const startClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 500);
    }

    useEffect(() => {
        const timer = setTimeout(startClose, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return isVisible ? (
        <div className={`toast toast--${type} ${isClosing ? 'toast--onClose' : ''}`}>
            <div className="toast__message">{message}</div>
            <button className="toast__close" onClick={startClose}>×</button>
        </div>
    ) : null;
}

export default Toast;