import { Outlet } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext/ToastContext";
import Header from "../../components/Header/Header";
import Toast from "../../components/Toast/Toast";
import './MainLayout.css';

const MainLayout = () => {
    const { message, type } = useToast();

    return (
        <div id="app-container">
            <Header />
            <Outlet />
            {message && <Toast message={message} type={type} />}
        </div>
    );
}

export default MainLayout;