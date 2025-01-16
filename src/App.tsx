import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import AppProvider from "./contexts/AppContext/AppProvider";

const App = () => { 
    return (
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    );
};

export default App;
