import { Fragment, useState, useEffect } from 'react';
import { Container, Box } from '@mui/material'
import Header from './layout/AppHeader.js'
import UserList from './components/UserList.js';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);


  return (
    <Fragment>
      <Header></Header>
      <Container maxWidth="xl">
        <Box marginTop={{ xs: 3 }} sx={{ height: 'calc(100vh - 64px)' }}>
          <UserList users={users} />
        </Box>
      </Container>
    </Fragment>
  );
}

export default App;
