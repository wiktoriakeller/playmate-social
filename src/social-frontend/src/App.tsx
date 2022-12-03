import AppProvider from "./app/providers/AppProvider";
import AppThemeProvider from "./app/providers/AppThemeProvider";
import Router from "./routing/Router";

function App() {
  return (
    <AppProvider>
      <AppThemeProvider>
        <Router />
      </AppThemeProvider>
    </AppProvider>
  );
}

export default App;
