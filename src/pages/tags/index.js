import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import GlobalLayout from '../../layouts/index'
import BlogTagLink from '../../components/BlogTagLink'
import AppContentContainer from '../../components/AppContentContainer'

const useStyles = makeStyles((theme) => ({
  blogTagLinkList: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    marginTop: '1.5rem',
  },
}))

function TagsPage({
  data: {
    allMarkdownRemark: { group },
  },
}) {
  const { t } = useTranslation()
  const classNames = useStyles()
  const theme = useTheme()

  return (
    <GlobalLayout>
      <AppContentContainer>
        <Typography component="h1" variant="h4">
          {t(`pages.tags.title`)}
        </Typography>

        <div className={classNames.blogTagLinkList}>
          {group.map((tag) => (
            <BlogTagLink
              key={tag.fieldValue}
              tagName={tag.fieldValue}
              tagCount={tag.totalCount}
              style={{ fontSize: theme.typography.h5.fontSize }}
            />
          ))}
        </div>
      </AppContentContainer>
    </GlobalLayout>
  )
}

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
