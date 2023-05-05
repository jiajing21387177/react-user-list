import * as React from 'react';
import './App.css';
import Header from './layout/AppHeader.js'
import { Container, Box } from '@mui/material'

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Container maxWidth="xl">
        <Box sx={{ height: 'calc(100vh - 64px)' }}>
          
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
