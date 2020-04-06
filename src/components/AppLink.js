import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import MuiLink from '@material-ui/core/Link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { useTheme } from '@material-ui/core/styles'

// https://material-ui.com/api/link/
// https://www.gatsbyjs.org/docs/gatsby-link/
const AppLink = ({ children, ...rest }) => {
  const theme = useTheme()
  const baseConfig = {
    color: 'secondary',
    activeStyle: { color: theme.palette.secondary.light },
  }
  return !!rest.href ? (
    <MuiLink component={OutboundLink} {...baseConfig} {...rest}>
      {children}
    </MuiLink>
  ) : (
    <MuiLink component={GatsbyLink} {...baseConfig} {...rest}>
      {children}
    </MuiLink>
  )
}

export default AppLink
