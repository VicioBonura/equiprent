import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { 
                path: "/", 
                element: (
                    <ProtectedRoute accessType="public">
                        <Home />
                    </ProtectedRoute>
                )
            },
            { 
                path: "/login", 
                element: (
                    <ProtectedRoute accessType="not-auth">
                        <Login />
                    </ProtectedRoute>
                )
            },
            { 
                path: "/register", 
                element: (
                    <ProtectedRoute accessType="not-auth">
                        <Register />
                    </ProtectedRoute>
                )
            },
            { 
                path: "/dashboard", 
                element: (
                    <ProtectedRoute accessType="auth-only">
                        <Dashboard />
                    </ProtectedRoute>
                )
            }
        ],
    },
]);

export default router;