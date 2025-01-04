import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div id="app-container">
            <Header />
            <Outlet />
        </div>
    );
}

export default MainLayout;