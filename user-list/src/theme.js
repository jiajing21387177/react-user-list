import { createTheme } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[700],
            secondary: blueGrey[500],
        }
    },
})

export default theme