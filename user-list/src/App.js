import { useState, useEffect } from 'react'
import { Container, Box, Grid, ThemeProvider } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Header from './layout/AppHeader.js'
import UserList from './components/UserList.js'
import UserSort from './components/UserSort.js'
import UserFilter from './components/UserFilter.js'
import theme from './theme.js'
import dot from 'dot-object'

function App() {


  const [users, setUsers] = useState([])

  const [filters, setFilters] = useState({
    filter: {
      name: '',
      email: '',
      phone: '',
    },
    sort: {
      key: 'name',
      asc: true
    },
    pagination: {
      per_page: 5,
      current_page: 1,
      total: 0
    }
  })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        handleFilterChange('pagination.total', data.length)
      })
      .catch(error => console.error(error))
  }, [])

  const handleFilterChange = (key, val) => {
    setFilters(prevFilters => {
      const filters = { ...prevFilters }
      dot.set(key, val, filters)
      return filters
    })
  }

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(filters.filter.name.toLowerCase())
    const emailMatch = user.email.toLowerCase().includes(filters.filter.email.toLowerCase())
    const phoneMatch = user.phone.toLowerCase().includes(filters.filter.phone.toLowerCase())

    return nameMatch && emailMatch && phoneMatch
  }).sort((a, b) => {
    const key = filters.sort.key
    if (!key) {
      return 0
    }
    if (filters.sort.asc) {
      return b[key].localeCompare(a[key])
    } else {
      return a[key].localeCompare(b[key])
    }
  })

  const toggleSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Container maxWidth="xl">
        <Box marginTop={{ xs: 3 }} sx={{ height: 'calc(100vh - 64px)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <UserFilter filter={filters.filter} onFilterChange={handleFilterChange} />
            </Grid>
            <Grid item xs={12} md={3}>
              <UserSort sort={filters.sort} onFilterChange={handleFilterChange} />
            </Grid>
          </Grid>
          <UserList users={filteredUsers} onToggleSnack={toggleSnack} />
        </Box>
      </Container>
      <SnackbarProvider />
    </ThemeProvider>
  )
}

export default App
