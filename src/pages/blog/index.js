import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'

import GlobalLayout from '../../layouts/index'
import BlogRoll from '../../components/BlogRoll'
import AppContentContainer from '../../components/AppContentContainer'

export default function BlogIndexPage() {
  const { t } = useTranslation()

  return (
    <GlobalLayout>
      <AppContentContainer>
        <Typography component="h1" variant="h4">
          {t(`pages.blog.title`)}
        </Typography>

        <BlogRoll />
      </AppContentContainer>
    </GlobalLayout>
  )
}
