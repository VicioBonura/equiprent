import { NavLink } from "react-router-dom";
import UserBtn from "../UserBtn/UserBtn";
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Icons } from "../Icons";
import './NavBar.css';

const NavBar = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <nav id="main-nav">
            <NavLink to="/" className="nav-link">
                <Icons.Home />
                <label>Home</label>
            </NavLink>
            <NavLink to="/equipments" className="nav-link">
                <Icons.Equipments />
                <label>Equipments</label>
            </NavLink>
            <NavLink to="/bookings" className="nav-link">
                <Icons.Bookings />
                <label>Bookings</label>
            </NavLink>
            {isAuthenticated && <NavLink to="/dashboard" className="nav-link">
                <Icons.Dashboard />
                <label>Dashboard</label>
            </NavLink>}
            <UserBtn />
        </nav>
    );
}

export default NavBar;