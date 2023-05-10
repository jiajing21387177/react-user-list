import { FormControl, Grid, Box, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { South, North } from '@mui/icons-material'

/**
* A component that let user choose to sort user list by key
* @param {Object} sort - An object representing the current sort criteria, containing "key" and "asc" properties.
* @param {function} onFilterChange - A callback function that handles changes to the sort criteria.
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
            onChange={(e) => onFilterChange('sort.key', e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Button for changing sorting direction */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton aria-label="Change sorting" onClick={() => onFilterChange('sort.asc', !sort.asc)}>
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
