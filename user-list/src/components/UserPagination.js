import TablePagination from '@mui/material/TablePagination';

const UserPagination = ({ pagination, onFilterChange }) => {

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
            onRowsPerPageChange={(e) => handlePageChange('per_page', e.target.value)}
        />
    )
}

export default UserPagination