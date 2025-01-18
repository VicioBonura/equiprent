import { CardProps } from "../../types/card";
import "./Card.css";

const Card = ({ children, className }: CardProps) => {
    return <div className={`card ${className ?? ""}`}>{children}</div>;
};

Card.Header = ({ children, className }: CardProps) => {
    return <div className={`card__header ${className ?? ""}`}>{children}</div>;
};

Card.Body = ({ children, className }: CardProps) => {
    return <div className={`card__body ${className ?? ""}`}>{children}</div>;
};

Card.Footer = ({ children, className }: CardProps) => {
    return <div className={`card__footer ${className ?? ""}`}>{children}</div>;
};

export default Card;
