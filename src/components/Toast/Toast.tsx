import './Toast.css';

const Toast = ({message, type}: {message: string, type: string}) => {
    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
}

export default Toast;