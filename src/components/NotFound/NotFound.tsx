import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="page-container">
            <h1>Pagina mancante</h1>
            <Link to="/" className="button button--secondary button--big">Ritrova la tua strada</Link>
        </div>
    );
};

export default NotFound;