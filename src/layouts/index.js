import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'typeface-roboto' // https://material-ui.com/components/typography/#install-with-npm

import AppHelmet from './AppHelmet'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import '../i18n'

export default ({ children }) => {
  // https://material-ui.com/customization/theming/
  // https://material-ui.com/customization/default-theme/#default-theme
  const theme = createMuiTheme({
    typography: {},
    // https://material-ui.com/customization/palette/
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#071f31',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#41b883',
      },
    },
    overrides: {},
  })

  return (
    <ThemeProvider theme={theme}>
      <AppHelmet />

      <AppHeader />

      {/* Use a container in each template not here so that they can be styled freely. */}
      {children}

      <AppFooter />
    </ThemeProvider>
  )
}
