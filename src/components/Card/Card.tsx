import { CardProps } from "../../types/card";
import "./Card.css";

/**
 * @param {CardProps} props - The props for the Card component.
 * @returns {JSX.Element} - The Card component.
 * @example
 * <Card>
 *  <CardHeader>{header}</CardHeader>
 *  <CardBody>{body}</CardBody>
 *  <CardFooter>{footer}</CardFooter>
 * </Card>
 */
const Card = ({ children, className }: CardProps) => {
    return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
