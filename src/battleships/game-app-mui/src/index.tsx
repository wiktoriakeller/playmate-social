import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import Button from '@mui/material/Button';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Button onClick={() => {alert('clicked');}}>
          Click me
        </Button>
        <Button variant="outlined" size="small">
          Small
        </Button>
        <App/>
    </Provider>
  </React.StrictMode>
);