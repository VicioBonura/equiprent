import { createContext, useContext } from 'react';
import { ToastContextType } from '../../types/toast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('Context not found');
    }
    return context;
}

export default ToastContext;