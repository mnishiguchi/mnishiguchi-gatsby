import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image' // https://www.gatsbyjs.org/packages/gatsby-image/
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import GlobalLayout from '../layouts/index'
import AppContentContainer from '../components/AppContentContainer'
import StackOverflowFlair from '../components/StackOverflowFlair'
import BrandIconSlideshow from '../components/BrandIconSlideshow'
import AppLink from '../components/AppLink'

const flexJustifyContentCenter = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
}

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    paddingTop: '1.5rem',
    paddingBottom: '2rem',
    color: '#fff',
    ...flexJustifyContentCenter,
  },
  headerTitle: {
    marginBottom: `.6rem`,
  },
  headerProfession: {
    marginBottom: `.6rem`,
    fontSize: `1.2rem`,
  },
  headerLocation: {
    color: '#bfe9d6',
    fontSize: `1.2rem`,
  },
  section: {
    marginTop: '2rem',
    ...flexJustifyContentCenter,
  },
  maxWidth600: {
    width: '100%',
    maxWidth: '600px',
  },
}))

export function IndexPageContent({ mainImage, secondaryImage }) {
  // https://react.i18next.com/latest/usetranslation-hook#usetranslation-params
  const { t } = useTranslation()
  const classNames = useStyles()

  return (
    <>
      <header className={classNames.header}>
        <div style={{ maxWidth: '500px' }}>
          <Typography
            component="h1"
            variant="h4"
            className={classNames.headerTitle}
          >
            {t('author.name')}
          </Typography>
          <div className={classNames.headerProfession}>
            {t('author.profession')}
          </div>
          <AppLink
            href={`https://www.google.com/maps/d/u/0/embed?mid=1VQHZbH9Elf3YIR0JCo9qQ0ywXGA&hl=en&ll=38.901906769884384%2C-77.01435253235564&z=6`}
            className={classNames.headerLocation}
          >
            {t('author.location')}
          </AppLink>
        </div>
      </header>

      <AppContentContainer>
        <section className={classNames.section}>
          <div>
            <GatsbyImage fluid={mainImage.childImageSharp.fluid} />
            <br />
            <StackOverflowFlair theme="clean" width="300px" />
          </div>
        </section>
        <section className={classNames.section}>
          <div className={classNames.maxWidth600}>
            <div>{t('pages.home.hobbies')}</div>
            <BrandIconSlideshow />
            <div>{t('pages.home.etc')}</div>
          </div>
        </section>
        <section className={classNames.section}>
          <div className={classNames.maxWidth600}>
            <GatsbyImage
              fluid={secondaryImage.childImageSharp.fluid}
              alt="Masatoshi Nishiguchi at Node DC"
            />
          </div>
        </section>
      </AppContentContainer>
    </>
  )
}

IndexPageContent.propTypes = {
  mainImage: PropTypes.object,
  secondaryImage: PropTypes.object,
}

function IndexPage({
  data: {
    markdownRemark: { frontmatter },
  },
}) {
  return (
    <GlobalLayout>
      <IndexPageContent {...frontmatter} />
    </GlobalLayout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageContent {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        mainImage {
          childImageSharp {
            fluid(maxWidth: 300, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        secondaryImage {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
