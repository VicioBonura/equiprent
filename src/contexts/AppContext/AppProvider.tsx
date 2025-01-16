import { PropsWithChildren } from "react";
import { AuthProvider } from "../AuthContext/AuthProvider";

const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default AppProvider