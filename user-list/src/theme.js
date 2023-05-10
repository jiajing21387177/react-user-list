import { createTheme } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors';

/**
* The createTheme function from the @mui/material/styles module is used to create a custom MUI theme.
* Here, we are creating a theme with a blueGrey color palette.
* The primary color of the theme is set to blueGrey[700] and the secondary color to blueGrey[500].
* @see https://mui.com/customization/theming/
*/

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[700],
            secondary: blueGrey[500],
        }
    },
})

export default theme