import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

const App = () => { 
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
};

export default App;
