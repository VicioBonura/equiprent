import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthContext/AuthProvider";
import ToastProvider from "./ToastContext/ToastProvider";

const AppContextWrapper = ({ children }: PropsWithChildren) => {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    )
}

export default AppContextWrapper;  