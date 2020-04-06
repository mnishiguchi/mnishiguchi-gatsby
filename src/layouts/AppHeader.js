import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import grey from '@material-ui/core/colors/grey'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import MoreIcon from '@material-ui/icons/MoreVert'

import I18nSwitcher from './I18nSwitcher'
import {
  HomeLink,
  BlogLink,
  TagsLink,
  GithubLink,
  LinkedinLink,
  SearchLink,
} from '../components/iconLinks'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBar: {
    background: grey[50],
  },
  toolbar: {
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values['md'],
      margin: 'auto',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

// https://material-ui.com/components/app-bar/
export default (props) => {
  const classNames = useStyles()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'mn-AppHeader-mobileMenuId'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <I18nSwitcher />
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar className={classNames.appBar}>
        <Toolbar className={classNames.toolbar}>
          <IconButton>
            <HomeLink />
          </IconButton>
          <IconButton>
            <BlogLink />
          </IconButton>
          <IconButton>
            <TagsLink />
          </IconButton>
          <IconButton>
            <LinkedinLink />
          </IconButton>
          <IconButton>
            <GithubLink />
          </IconButton>
          <IconButton>
            <SearchLink />
          </IconButton>

          {/* Spacer */}
          <div className={classNames.grow} />

          {/* For mobile only */}
          <div className={classNames.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </div>

          {/* For desktop only */}
          <div className={classNames.sectionDesktop}>
            <MenuItem>
              <I18nSwitcher />
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
    </>
  )
}
