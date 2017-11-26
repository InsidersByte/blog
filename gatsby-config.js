const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  pathPrefix: isProduction ? `/blog` : `/`,
  siteMetadata: {
    author: 'InsidersByte',
    title: 'InsidersByte',
    description:
      'The blog of the London, UK based software engineer Jonathon Kelly',
    siteUrl: 'https://insidersbyte.github.io/blog',
    twitterUrl: 'https://twitter.com/insidersbyte',
    githubUrl: 'https://github.com/insidersbyte',
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-nprogress',
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
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 786,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-emoji',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_self',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'InsidersByte',
        short_name: 'InsidersByte',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#663698',
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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-plugin-feed',
  ],
};
