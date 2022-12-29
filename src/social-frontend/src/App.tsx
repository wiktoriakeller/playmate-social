import { GoogleOAuthProvider } from "@react-oauth/google";
import AppStoreProvider from "./app/providers/AppStoreProvider";
import AppThemeProvider from "./app/providers/AppThemeProvider";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";
import Router from "./routing/Router";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <AppStoreProvider>
      <AppThemeProvider>
        <GoogleOAuthProvider clientId={googleClientId}>
          <Router />
          <SnackbarComponent />
        </GoogleOAuthProvider>
      </AppThemeProvider>
    </AppStoreProvider>
  );
}

export default App;
