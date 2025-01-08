import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserBtn from "../UserBtn/UserBtn";
import { isLoggedIn } from "../../utils/auth";
import './NavBar.css';

const NavBar = () => {
    const [isAuth, setIsAuth] = useState(isLoggedIn());
    
    useEffect(() => {
        const checkAuth = () => setIsAuth(isLoggedIn());
        checkAuth();
        window.addEventListener('auth-change', checkAuth);
        
        return () => {
            window.removeEventListener('auth-change', checkAuth);
        };
    }, [])

    return (
        <nav id="main-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {isAuth && <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>}
            <UserBtn />
        </nav>
    );
}

export default NavBar;