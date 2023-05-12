import TablePagination from '@mui/material/TablePagination';

/**
 * Handles the change in the current page number or number of users per page.
 * Calls the onFilterChange callback function with the new value.
 * @param {object} pagination - filterReducer's dispatch function
 * @param {function} onFilterChange - filterReducer's dispatch function
 */
const UserPagination = ({ pagination, onFilterChange }) => {

    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={pagination?.total || 0}
            page={pagination?.current_page || 0}
            rowsPerPage={pagination?.per_page || 5}
            onPageChange={(e, value) => onFilterChange({ type: 'SET_PAGE', value })}
            onRowsPerPageChange={(e) => onFilterChange({ type: 'SET_FILTER', key: 'pagination.per_page', value: e.target.value })}
        />
    )
}

export default UserPagination