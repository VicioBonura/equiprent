import { NavLink } from "react-router-dom";
import UserBtn from "../UserBtn/UserBtn";
import './NavBar.css';

const NavBar = () => {
    return (
        <nav id="main-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <UserBtn />
        </nav>
    );
}

export default NavBar;