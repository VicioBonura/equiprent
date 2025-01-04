import NavBar from '../NavBar/NavBar';
import './Header.css';

const Header = () => {
    return (
        <header id="header">
            <h1 id="mainTitle">Equip<span className="accent">R</span>ent</h1>
            <NavBar />
        </header>
    );
}

export default Header;