const { name } = require('./package.json');

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  siteMetadata: {
    author: 'You!',
    title: `Gatsby Default (Blog) Starter`,
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'InsidersByte',
        short_name: 'InsidersByte',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icons: [
          {
            src: '/static/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
