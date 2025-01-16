import { useToast } from '../../contexts/ToastContext/ToastContext';

const ToastTester = () => {
    const { showToast } = useToast();

    return (
        <div style={{ padding: '1rem', margin: '1rem', backgroundColor: 'var(--bg-light)' }}>
            <h2>T(oa/e)ster</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => showToast({ message: 'Operazione completata con successo!', type: 'success', onClose: () => alert('Toast closed') })}>
                    Success
                </button>
                <button onClick={() => showToast({ message: 'Si è verificato un errore durante l\'operazione.', type: 'error', onClose: () => {alert('Toast closed');} })}>
                    Error
                </button>
                <button onClick={() => showToast({ message: 'Attenzione: questa è un\'azione irreversibile.', type: 'warning', onClose: () => {alert('Toast closed');} })}>
                    Warning
                </button>
                <button onClick={() => showToast({ message: 'La sessione scadrà tra 5 minuti.', type: 'info', onClose: () => {alert('Toast closed');} })}>
                    Info
                </button>
            </div>
        </div>
    );
};

export default ToastTester;
