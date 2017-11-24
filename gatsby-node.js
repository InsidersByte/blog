const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

const createTagPages = (createPage, edges) => {
  const tagTemplate = path.resolve(`src/templates/tag.js`);
  const tags = {};

  edges.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        tags[tag].push(node);
      });
    }
  });

  Object.keys(tags).forEach(tagName => {
    const posts = tags[tagName];

    createPage({
      path: `/tags/${tagName}`,
      component: tagTemplate,
      context: {
        posts,
        tag: tagName,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = node.frontmatter.path
      ? node.frontmatter.path
      : createFilePath({ node, getNode, basePath: `pages` });
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

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
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

    const posts = result.data.allMarkdownRemark.edges;

    createTagPages(createPage, posts);

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
        },
      });
    });

    return posts;
  });
};
