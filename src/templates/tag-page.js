import React from 'react'
import { Link, graphql } from 'gatsby'
import Typography from '@material-ui/core/Typography'

import GlobalLayout from '../layouts/index'
import AppContentContainer from '../components/AppContentContainer'

function TagPage({ data: { site, allMarkdownRemark }, pageContext: { tag } }) {
  const posts = allMarkdownRemark.edges
  const totalCount = allMarkdownRemark.totalCount
  const tagHeader = `${totalCount} ${
    totalCount === 1 ? 'post' : 'posts'
  } tagged with “${tag}”`

  return (
    <GlobalLayout>
      <AppContentContainer>
        <Typography component="h1" variant="h4">
          {tagHeader}
        </Typography>
        <ul>
          {posts.map(({ node: { fields, frontmatter } }) => (
            <li>
              <Link to={fields.slug} key={fields.slug} className="text-dark">
                {frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <Link to="/tags/" className="btn btn-outline-primary">
          Browse all tags
        </Link>
      </AppContentContainer>
    </GlobalLayout>
  )
}

export default TagPage

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
