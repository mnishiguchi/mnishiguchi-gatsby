import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import MuiLink from '@material-ui/core/Link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { useTheme } from '@material-ui/core/styles'

// https://material-ui.com/api/link/
// https://www.gatsbyjs.org/docs/gatsby-link/
const AppLink = ({ children, ...rest }) => {
  const theme = useTheme()
  return !!rest.href ? (
    <MuiLink component={OutboundLink} {...rest}>
      {children}
    </MuiLink>
  ) : (
    <MuiLink
      component={GatsbyLink}
      color="primary"
      activeStyle={{ color: theme.palette.grey[600] }}
      {...rest}
    >
      {children}
    </MuiLink>
  )
}

export default AppLink
