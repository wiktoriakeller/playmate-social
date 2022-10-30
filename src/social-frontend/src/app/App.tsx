import env from "react-dotenv";
import Router from "../components/routing/Router";
import { AppProvider } from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
