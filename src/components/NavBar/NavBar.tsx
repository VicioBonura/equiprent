import { NavLink } from "react-router-dom";
import UserBtn from "../UserBtn/UserBtn";
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './NavBar.css';

const NavBar = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <nav id="main-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/equipments" className="nav-link">Equipments</NavLink>
            <NavLink to="/bookings" className="nav-link">Bookings</NavLink>
            {isAuthenticated && <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>}
            <UserBtn />
        </nav>
    );
}

export default NavBar;