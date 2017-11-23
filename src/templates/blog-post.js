// @flow

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Tags from '../components/Tags';

declare var graphql: any;

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string,
        author: string,
      },
    },
    markdownRemark: {
      html: string,
      timeToRead: number,
      excerpt: string,
      frontmatter: {
        title: string,
        date: string,
        rawDate: string,
        path: string,
        image?: {
          childImageSharp: {
            resize: {
              src: string,
            },
            sizes: {},
          },
        },
        imageAuthor: string,
        imageAuthorLink: string,
        tags?: Array<string>,
      },
    },
  },
};

const Header = styled.div`
  margin: 2rem 0 3rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.h3`
  color: #555;
  margin: 0;
`;

const Image = styled.div`
  margin-bottom: 3rem;
`;

const Footer = styled.div`
  padding-top: 0.5rem;
`;

const Template = ({ data }: Props) => {
  const {
    site: { siteMetadata: { author, title } },
    markdownRemark: post,
  } = data;

  const description = post.frontmatter.excerpt
    ? post.frontmatter.excerpt
    : post.excerpt;

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize.src
    : null;

  const meta = [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'og:description',
      content: description,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'og:title',
      content: post.frontmatter.title,
    },
    {
      name: 'og:type',
      content: 'article',
    },
    {
      name: 'article:author',
      content: author,
    },
    {
      name: 'twitter:creator',
      content: 'insidersbyte',
    },
    {
      name: 'author',
      content: author,
    },
    {
      name: 'twitter:label1',
      content: 'Reading time',
    },
    {
      name: 'twitter:data1',
      content: `${post.timeToRead} min read`,
    },
    {
      name: 'article:published_time',
      content: post.frontmatter.rawDate,
    },
  ];

  if (image) {
    meta.push({
      name: 'og:image',
      content: image,
    });
    meta.push({
      name: 'twitter:image',
      content: image,
    });
  }

  return (
    <div>
      <Helmet title={`${title} - ${post.frontmatter.title}`} meta={meta} />
      <div>
        <Header>
          <Title>{post.frontmatter.title}</Title>
          <Subtitle>
            {post.frontmatter.date} &#183; {post.timeToRead} min read
          </Subtitle>
        </Header>

        {post.frontmatter.image && (
          <Image>
            <Img sizes={post.frontmatter.image.childImageSharp.sizes} />
            {post.frontmatter.imageAuthor &&
              post.frontmatter.imageAuthorLink && (
                <em>
                  Image by{` `}
                  <a href={post.frontmatter.imageAuthorLink}>
                    {post.frontmatter.imageAuthorLink}
                  </a>
                </em>
              )}
          </Image>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.frontmatter.tags &&
          post.frontmatter.tags.length > 0 && (
            <Footer>
              <Tags tags={post.frontmatter.tags} />
            </Footer>
          )}
      </div>
    </div>
  );
};

export default Template;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        date(formatString: "MMM D, YYYY")
        rawDate: date
        path
        tags
        title
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            sizes(quality: 100) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`;
