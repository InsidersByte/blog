// @flow

import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';

const Link = styled(GatsbyLink)`
  display: inline-block;
  color: #663698;
  padding: 0.75rem 1rem;
  border: 2px solid #663698;
  text-decoration: none;
  position: relative;

  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #663698;
    transition: 250ms ease-in-out;
    transform: scaleY(0);
    transform-origin: bottom;
    margin-top: 0;
    z-index: -1;
  }

  :hover {
    color: white;
  }

  :hover:after {
    transform: scaleY(1);
  }
`;

export default Link;
