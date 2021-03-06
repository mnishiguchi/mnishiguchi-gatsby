const siteUrl = 'https://mnishiguchi-gatsby.com'

// For sourcing data into your Gatsby application from your local filesystem.
// https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
const sourceFilesystemPlugins = [
  {
    // Keep as first gatsby-source-filesystem plugin for gatsby image support.
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/static/img`,
      name: 'uploads',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/pages`,
      name: 'pages',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/img`,
      name: 'images',
    },
  },
]

// Parses Markdown files using Remark.
// https://www.gatsbyjs.org/packages/gatsby-transformer-remark/
const transformarRemarkPlugin = {
  resolve: 'gatsby-transformer-remark',
  options: {
    plugins: [
      {
        resolve: 'gatsby-remark-relative-images',
        options: {
          name: 'uploads',
        },
      },
      {
        resolve: 'gatsby-remark-images',
        options: {
          // It's important to specify the maxWidth (in pixels) of
          // the content container as this plugin uses this as the
          // base for generating different widths of each image.
          maxWidth: 2048,
        },
      },
      {
        resolve: 'gatsby-remark-copy-linked-files',
        options: {
          destinationDir: 'static',
        },
      },
      // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
      `gatsby-remark-prismjs`,
      `gatsby-remark-autolink-headers`,
    ],
  },
}

// For full text search implementation based on FlexSearch.js client-side index.
// https://www.gatsbyjs.org/packages/gatsby-plugin-flexsearch/
const flexsearchPlugin = {
  resolve: 'gatsby-plugin-flexsearch',
  options: {
    languages: ['en'],
    type: 'MarkdownRemark',
    fields: [
      {
        name: 'title',
        indexed: true,
        resolver: 'frontmatter.title',
        attributes: {
          encode: 'balance',
          tokenize: 'forward',
          threshold: 6,
          depth: 3,
        },
        store: true,
      },
      {
        name: 'description',
        indexed: true,
        resolver: 'frontmatter.description',
        attributes: {
          encode: 'balance',
          tokenize: 'forward',
          threshold: 6,
          depth: 3,
        },
        store: false,
      },
      {
        name: 'url',
        indexed: false,
        resolver: 'fields.slug',
        store: true,
      },
    ],
  },
}

module.exports = {
  siteMetadata: {
    title: 'mnishiguchi',
    description: `This is Masatoshi Nishiguchi's blog`,
    siteUrl,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    ...sourceFilesystemPlugins,
    // Exposes several image processing functions built on the Sharp image processing library.
    // https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/
    'gatsby-plugin-sharp',
    // Creates ImageSharp nodes from image types that are supported by the Sharp image processing library and provides fields in their GraphQL types for processing your images in a variety of ways including resizing, cropping, and creating responsive images.
    // https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/
    'gatsby-transformer-sharp',
    transformarRemarkPlugin,
    flexsearchPlugin,
    `gatsby-plugin-sitemap`,
    // https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
    `gatsby-plugin-offline`,
    {
      // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Masatoshi Nishiguchi`,
        short_name: `Masatoshi Nishiguchi`,
        start_url: `/`,
        background_color: `#072031`,
        theme_color: `#071f31`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    // Must be after other CSS plugins
    // https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/
    'gatsby-plugin-netlify', // Make sure to keep it last in the array
  ],
}
