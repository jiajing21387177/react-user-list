import * as React from 'react';
import { AppBar, Toolbar, Container, Typography } from '@mui/material';

function AppHeader() {

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            User List
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;