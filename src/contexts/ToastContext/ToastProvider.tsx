import { useState, PropsWithChildren } from "react";
import ToastContext from "./ToastContext";
import { ToastProps, ToastContextType } from "../../types/toast";

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toast, setToast] = useState<ToastProps>({
        message: '',
        type: 'success',
        duration: 3000,
        onClose: () => {}
    });

    const showToast = (toast: ToastProps) => {       
        setToast(toast);
    }

    return <ToastContext.Provider value={{...toast, showToast} as ToastContextType}>
        {children}
    </ToastContext.Provider>
}

export default ToastProvider;
