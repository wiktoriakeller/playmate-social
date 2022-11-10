import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {WSConfig} from './features/WSConfig/WSConfig';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <WSConfig></WSConfig>
        </Box>
    </Container>
    </div>
  );
}

export default App;
