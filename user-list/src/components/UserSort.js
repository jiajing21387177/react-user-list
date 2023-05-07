import { FormControl, Grid, Box, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { South, North } from '@mui/icons-material'

function UserSort({ sort, onFilterChange }) {
  return (
    <Grid container>
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton aria-label="Change sorting" onClick={() => onFilterChange('sort.asc', !sort.asc)}>
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
