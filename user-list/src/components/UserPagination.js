import TablePagination from '@mui/material/TablePagination';

/**
 * Handles the change in the current page number or number of users per page.
 * Calls the onFilterChange callback function with the new value.
 * @param {string} key - The key in the pagination object to be updated.
 * @param {any} val - The new value for the key in the pagination object.
 */
const UserPagination = ({ pagination, onFilterChange }) => {

    // Update filters pagination value
    const handlePageChange = (key, val) => {
        onFilterChange('pagination.' + key, val, false)
    }

    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={pagination?.total || 0}
            page={pagination?.current_page || 0}
            rowsPerPage={pagination?.per_page || 5}
            onPageChange={(e, val) => handlePageChange('current_page', val)}
            onRowsPerPageChange={(e) => {
                handlePageChange('current_page', 0)
                handlePageChange('per_page', e.target.value)
            }}
        />
    )
}

export default UserPagination