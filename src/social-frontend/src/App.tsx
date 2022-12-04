import AppStoreProvider from "./app/providers/AppStoreProvider";
import AppThemeProvider from "./app/providers/AppThemeProvider";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";
import Router from "./routing/Router";

function App() {
  return (
    <AppStoreProvider>
      <AppThemeProvider>
        <Router />
        <SnackbarComponent />
      </AppThemeProvider>
    </AppStoreProvider>
  );
}

export default App;
