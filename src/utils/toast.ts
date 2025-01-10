import { ToastProps } from "../types/toast";

let isToastSystemReady = false;

export const initToastSystem = () => {
    isToastSystemReady = true;
}

export const showToast = (toast: ToastProps): boolean => {

    //retry pattern
    if (!isToastSystemReady) {
        setTimeout(() => showToast(toast), 500);
        return false;
    }
    
    const event = new CustomEvent('show-toast', { detail: toast, bubbles: true });
    window.dispatchEvent(event);
    return true;
}