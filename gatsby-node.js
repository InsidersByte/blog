const { createFilePath } = require(`gatsby-source-filesystem`);
const paramCase = require('param-case');
const path = require('path');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = node.frontmatter.slug
      ? `/${paramCase(node.frontmatter.slug)}/`
      : `/${
          createFilePath({ node, getNode, basePath: `pages` }).split('---')[1]
        }`;

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const tagTemplate = path.resolve(`src/templates/tag.js`);

  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            timeToRead
            fields {
              slug
            }
            frontmatter {
              date
              tags
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
        },
      });
    });

    const tags = new Set();

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.forEach(tag => {
          tags.add(tag);
        });
      }
    });

    tags.forEach(tag => {
      createPage({
        path: `/tags/${paramCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });

    return Promise.resolve();
  });
};
