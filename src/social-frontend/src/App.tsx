import AppStoreProvider from "./app/providers/AppStoreProvider";
import AppThemeProvider from "./app/providers/AppThemeProvider";
import Router from "./routing/Router";

function App() {
  return (
    <AppStoreProvider>
      <AppThemeProvider>
        <Router />
      </AppThemeProvider>
    </AppStoreProvider>
  );
}

export default App;
