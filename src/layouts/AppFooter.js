import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import AppLink from '../components/AppLink'

function Copyright() {
  const { t } = useTranslation()

  return (
    <Typography variant="body1">
      {'Copyright © '}
      <AppLink color="inherit" href="https://mnishiguchi.com/">
        {t('author.name')}
      </AppLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  footer: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6, 0),
    textAlign: 'center',
  },
}))

function AppFooter() {
  const classNames = useStyles()

  return (
    <>
      <Divider />
      <footer className={classNames.footer}>
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </footer>
    </>
  )
}

export default AppFooter
