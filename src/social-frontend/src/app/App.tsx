import AppTheme from "../components/AppTheme";
import Router from "../components/routing/Router";
import AppProvider from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <AppTheme>
        <Router />
      </AppTheme>
    </AppProvider>
  );
}

export default App;
