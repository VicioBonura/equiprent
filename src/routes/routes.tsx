import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import Equipments from "../pages/Equipments";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Bookings from "../pages/Bookings";
import Featured from "../pages/Featured";
import NotFound from "../components/NotFound/NotFound";

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
                path: "/equipments", 
                element: (
                    <ProtectedRoute accessType="public">
                        <Equipments />
                    </ProtectedRoute>
                )
            },
            { 
                path: "/bookings", 
                element: (
                    <ProtectedRoute accessType="public">
                        <Bookings />
                    </ProtectedRoute>
                )
            },
            { 
                path: "/featured/:id", 
                element: (
                    <ProtectedRoute accessType="public">
                        <Featured />
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
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);

export default router;