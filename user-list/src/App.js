import { useState, useEffect, useCallback } from 'react'
import { Container, Box, Grid, ThemeProvider } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Header from './layout/AppHeader.js'
import UserList from './components/UserList.js'
import UserFilter from './components/UserFilter.js'
import UserSort from './components/UserSort.js'
import UserPagination from './components/UserPagination.js'
import theme from './theme.js'
import dot from 'dot-object'

function App() {

  // States
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
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
      current_page: 0,
      total: 0
    }
  })

  /**
  * @description Fetches users from a remote API endpoint.
  * Sets total number of users in the state.
  * @returns {void}
  */
  const fetchUsers = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilters(prevFilters => ({
          ...prevFilters,
          pagination: {
            ...prevFilters.pagination,
            total: data.length,
          },
        }));
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(fetchUsers, [fetchUsers])

  /**
  * @description Applies filters to the list of users.
  * Filters based on search conditions, sorts based on sort conditions and pagination condition.
  * And then set into filteredUsers.
  * @returns {void}
  */
  const applyFilters = useCallback(() => {
    // Filter users by condition
    let arr = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.filter.name.toLowerCase())
      const emailMatch = user.email.toLowerCase().includes(filters.filter.email.toLowerCase())
      const phoneMatch = user.phone.toLowerCase().includes(filters.filter.phone.toLowerCase())

      return nameMatch && emailMatch && phoneMatch
    })

    // Sort users by condition
    arr = arr.sort((a, b) => {
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

    // Pick data according to pagination value
    const startIndex = filters.pagination.current_page * filters.pagination.per_page
    const endIndex = startIndex + filters.pagination.per_page
    arr = arr.slice(startIndex, endIndex)

    // Set arr to filteredUsers for UserList
    setFilteredUsers(arr)
  }, [filters, users])

  useEffect(applyFilters, [applyFilters, users, filters])

  /**
  * @description Sets filter values in state based on the input key.
  * Resets pagination to the first page if resetPagination flag is true.
  * @param {string} key - The key in the filter object
  * @param {mixed} val - The key in the filter object
  * @param {bool} resetPagination - Reset value of total and current_page in pagination
  */
  const handleFilterChange = useCallback((key, val, resetPagination = true) => {
    setFilters(prevFilters => {
      const filters = { ...prevFilters }
      dot.set(key, val, filters)
      if (resetPagination) {
        dot.set('pagination.current_page', 0, filters)
        dot.set('pagination.total', users.total)
      }
      return filters
    })
  }, [users])

  /**
  * @description Show snackbar with message and specific variant
  * @param {string} message - The message string show in the snackbar
  * @param {string} variant - Variant of the snackbar
  * @link https://mui.com/material-ui/react-snackbar/
  */
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
          <UserPagination pagination={filters.pagination} onFilterChange={handleFilterChange} ></UserPagination>
        </Box>
      </Container>
      <SnackbarProvider />
    </ThemeProvider>
  )
}

export default App
