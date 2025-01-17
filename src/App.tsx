import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import AppContextWrapper from "./contexts/";

const App = () => { 
    return (
      <AppContextWrapper>
        <RouterProvider router={router} />
      </AppContextWrapper>
    );
};

export default App;
