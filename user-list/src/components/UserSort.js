import { FormControl, Grid, Box, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { South, North } from '@mui/icons-material'

/**
* A component that let user choose to sort user list by key
* @param {object} sort - An object representing the current sort criteria, containing "key" and "asc" properties.
* @param {function} onFilterChange - filterReducer's dispatch function
*/
function UserSort({ sort, onFilterChange }) {
  return (
    <Grid container>
      {/* Dropdown for selecting sorting criteria */}
      <Box sx={{ flexGrow: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort by:</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sort.key}
            onChange={(e) => onFilterChange({ type: 'SET_SORT', key: 'sort.key', value: e.target.value })}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Button for changing sorting direction */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          aria-label="Change sorting"
          onChange={(e) => onFilterChange({ type: 'SET_SORT', key: 'sort.asc', value: !sort.asc })}
        >
          {/* Arrow icon indicating current sorting direction */}
          {
            sort.asc ?
              <South></South>
              : <North></North>
          }
        </IconButton>
      </Box>
    </Grid>
  )
}

export default UserSort
