import { Grid, FormControl, TextField } from '@mui/material'

/**
* UserFilter component renders a set of input fields to filter users by name, email, and phone.
* @param {object} filter - an object containing the current filter values for name, email, and phone.
* @param {function} onFilterChange - filterReducer's dispatch function
*/
function UserFilter({ filter, onFilterChange }) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <TextField
                        id="filter-name"
                        name="name"
                        label="Name"
                        value={filter.name}
                        fullWidth
                        onChange={(e) => onFilterChange({ type: 'SET_FILTER', key: 'filter.name', value: e.target.value })}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <TextField
                        id="filter-email"
                        name="email"
                        label="Email"
                        value={filter.email}
                        fullWidth
                        onChange={(e) => onFilterChange({ type: 'SET_FILTER', key: 'filter.email', value: e.target.value })}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <TextField
                        id="filter-phone"
                        name="phone"
                        label="Phone"
                        value={filter.phone}
                        fullWidth
                        onChange={(e) => onFilterChange({ type: 'SET_FILTER', key: 'filter.phone', value: e.target.value })}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default UserFilter
