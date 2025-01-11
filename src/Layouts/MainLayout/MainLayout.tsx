import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastProps } from "../../types/toast";
import Header from "../../components/Header/Header";
import Toast from "../../components/Toast/Toast";
import { initToastSystem } from "../../utils/toast";
import './MainLayout.css';

const MainLayout = () => {
    const [toast, setToast] = useState<ToastProps | null>(null);

    useEffect(() => {
        const handleToast = (e: CustomEvent<ToastProps>) => {
            setToast(e.detail);
        }

        window.addEventListener('show-toast', handleToast as EventListener);
        initToastSystem();
        
        return () => window.removeEventListener('show-toast', handleToast as EventListener);
    }, []);

    return (
        <div id="app-container">
            <Header />
            <Outlet />
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </div>
    );
}

export default MainLayout;