import Router from './components/Router';
import { AppProvider } from './providers/AppProvider';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
