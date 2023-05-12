import { useState, useEffect, useCallback, useReducer } from 'react'
import { Container, Box, Grid, ThemeProvider } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Header from './layout/AppHeader.js'
import UserList from './components/UserList.js'
import UserFilter from './components/UserFilter.js'
import UserSort from './components/UserSort.js'
import UserPagination from './components/UserPagination.js'
import theme from './theme.js'
import dot from 'dot-object'

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      dot.set(action.key, action.value, state)
      dot.set('pagination.current_page', 0, state)
      break
    case 'SET_SORT':
      dot.set(action.key, action.value, state)
      break
    case 'SET_PAGE':
      dot.set('pagination.current_page', 0, state.value)
      break
    default:
      break
  }
  return { ...state }
}

function App() {
  // States
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  // Reducers
  const [filterState, filterDispatch] = useReducer(filterReducer, {
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
        filterDispatch({ type: 'SET_FILTER', key: 'pagination.total', value: data.length })
        setUsers(data);
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
    const timeout = setTimeout(() => {
      // Filter users by condition
      let arr = users.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(filterState.filter.name.toLowerCase())
        const emailMatch = user.email.toLowerCase().includes(filterState.filter.email.toLowerCase())
        const phoneMatch = user.phone.toLowerCase().includes(filterState.filter.phone.toLowerCase())

        return nameMatch && emailMatch && phoneMatch
      })

      // Sort users by condition
      arr = arr.sort((a, b) => {
        const key = filterState.sort.key
        if (!key) {
          return 0
        }
        if (filterState.sort.asc) {
          return b[key].localeCompare(a[key])
        } else {
          return a[key].localeCompare(b[key])
        }
      })

      // Pick data according to pagination value
      const startIndex = filterState.pagination.current_page * filterState.pagination.per_page
      const endIndex = startIndex + filterState.pagination.per_page
      arr = arr.slice(startIndex, endIndex)

      // Set arr to filteredUsers for UserList
      setFilteredUsers(arr)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [filterState, users])

  useEffect(applyFilters, [applyFilters, users, filterState])

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
              <UserFilter filter={filterState.filter} onFilterChange={filterDispatch} />
            </Grid>
            <Grid item xs={12} md={3}>
              <UserSort sort={filterState.sort} onFilterChange={filterDispatch} />
            </Grid>
          </Grid>
          <UserList users={filteredUsers} onToggleSnack={toggleSnack} />
          <UserPagination pagination={filterState.pagination} onFilterChange={filterDispatch} ></UserPagination>
        </Box>
      </Container>
      <SnackbarProvider />
    </ThemeProvider>
  )
}

export default App
