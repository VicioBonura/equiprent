import { useState } from 'react';
import Toast from './Toast';
import { ToastType } from './types';

const ToastTester = () => {
    const [activeToast, setActiveToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    const showToast = (type: ToastType) => {
        const messages = {
            success: 'Operazione completata con successo!',
            error: 'Si è verificato un errore durante l\'operazione.',
            warning: 'Attenzione: questa è un\'azione irreversibile.',
            info: 'La sessione scadrà tra 5 minuti.'
        };

        setActiveToast({
            message: messages[type],
            type
        });
    };

    return (
        <div style={{ padding: '1rem', margin: '1rem', backgroundColor: 'var(--bg-light)' }}>
            <h2>T(oa/e)ster</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => showToast('success')}>
                    Success
                </button>
                <button onClick={() => showToast('error')}>
                    Error
                </button>
                <button onClick={() => showToast('warning')}>
                    Warning
                </button>
                <button onClick={() => showToast('info')}>
                    Info
                </button>
            </div>

            {activeToast && (
                <Toast
                    {...activeToast}
                    duration={50000}
                />
            )}
        </div>
    );
};

export default ToastTester;
