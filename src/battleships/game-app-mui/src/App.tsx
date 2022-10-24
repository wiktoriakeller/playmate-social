import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {WSConfig} from './features/WSConfig/WSConfig';
import {Chat} from './features/Chat/Chat';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          
          {/* <WSConfig></WSConfig> */}
          {/* <Chat></Chat> */}
        </Box>
    </Container>
    </div>
  );
}

export default App;
