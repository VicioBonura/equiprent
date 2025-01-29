import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Equipment } from "../types/equipment";
import { getEquipments } from "../services/api";
import EquipmentList from "../components/EquipmentList/EquipmentList";
import "../assets/css/home.css";

const HERO_IMAGES = [
    "/assets/images/equiprent_home_1.jpg",
    "/assets/images/equiprent_home_2.jpg",
    "/assets/images/equiprent_home_3.jpg",
    "/assets/images/equiprent_home_4.jpg"
];

const HERO_CLAIMS = [
    "Allena il tuo potenziale, prenota il tuo successo",
    "La tua palestra, i tuoi tempi, le tue regole",
    "Niente più attese, solo risultati",
    "Trasforma ogni minuto in un'opportunità di crescita"
];

const Home = () => {
    const [heroImage, setHeroImage] = useState<string>("");
    const [heroClaim, setHeroClaim] = useState<string>("");
    const [topEquipments, setTopEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        // random image and claim
        setHeroImage(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
        setHeroClaim(HERO_CLAIMS[Math.floor(Math.random() * HERO_CLAIMS.length)]);

        // top equipments //XXX TODO: più prenotati
        const loadTopEquipments = async () => {
            try {
                const equipments = await getEquipments();
                setTopEquipments(equipments.slice(0, 3));
            } catch (error) {
                console.error("Errore nel caricamento delle attrezzature:", error);
            }
        };
        loadTopEquipments();
    }, []);

    return (
        <div className="page-container">
            <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="hero__content">
                    <p className="hero__claim">{heroClaim}</p>
                    <Link to="/register" className="button button--secondary button--big">Inizia Ora</Link>
                </div>
            </section>

            <section className="featured">
                <h2>Le Attrezzature Più Popolari</h2>
                <div className="equipments-list">
                    <EquipmentList equipments={topEquipments} />
                </div>
            </section>

            <section className="premium">
                <h2>Passa a Premium</h2>
                <div className="premium__features">
                    <div className="premium__feature">
                        <h3>Quick Booking</h3>
                        <p>Prenota più velocemente con i pulsanti +5/-5 minuti</p>
                    </div>
                    <div className="premium__feature">
                        <h3>Più Tempo</h3>
                        <p>Estendi la durata massima delle prenotazioni fino a 20 minuti</p>
                    </div>
                </div>
                <Link to="/register" className="button button--big">Registrati Ora</Link>
            </section>
        </div>
    );
}

export default Home;