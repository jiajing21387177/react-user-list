import { Fragment, useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material'
import Header from './layout/AppHeader.js'
import UserList from './components/UserList.js';
import UserFilter from './components/UserFilter.js';
import dot from 'dot-object'

function App() {

  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    filter: {
      name: '',
      email: '',
      phone: '',
    }
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  const handleFilterChange = (key, val) => {
    setFilters(prevFilters => {
      const filters = { ...prevFilters }
      dot.set(key, val, filters)
      return filters
    });
  }

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(filters.filter.name.toLowerCase())
    const emailMatch = user.email.toLowerCase().includes(filters.filter.email.toLowerCase())
    const phoneMatch = user.phone.toLowerCase().includes(filters.filter.phone.toLowerCase())

    return nameMatch && emailMatch && phoneMatch;
  })

  return (
    <Fragment>
      <Header></Header>
      <Container maxWidth="xl">
        <Box marginTop={{ xs: 3 }} sx={{ height: 'calc(100vh - 64px)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserFilter filter={filters.filter} onFilterChange={handleFilterChange} />
            </Grid>
          </Grid>
          <UserList users={filteredUsers} />
        </Box>
      </Container>
    </Fragment>
  );
}

export default App;
