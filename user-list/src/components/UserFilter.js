import { Grid, FormControl, TextField } from '@mui/material'

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
                        onChange={(e) => onFilterChange('filter.name', e.target.value)}
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
                        onChange={(e) => onFilterChange('filter.email', e.target.value)}
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
                        onChange={(e) => onFilterChange('filter.phone', e.target.value)}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default UserFilter
