import styled from 'styled-components';
import { transparentize } from 'polished';
import Router from 'next/router';
import palette from '../../styles/palette';

const sidebarTransition = `
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;
const SidebarButton = styled.div`
  border-bottom: 1px solid ${palette.lotusTheme.primary};
  box-sizing: border-box;
  color: ${palette.lotusTheme.primary};
  cursor: pointer;
  font-family: 'Oswald', sans-serif;
  height: 50px;
  position: relative;
  text-transform: uppercase;
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  width: 100%;

  /* gradient bg on hover */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      ellipse at bottom,
      ${transparentize(0.7, palette.lotusTheme.secondary)} 0%,
      transparent 75%
    );
    opacity: 0;
    ${sidebarTransition};
  }

  /* bottom border */
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 51%;
    right: 51%;
    height: 3px;
    background-color: ${palette.lotusTheme.primary};
    ${sidebarTransition};
  }

  svg {
    position: absolute;
    left: 9px;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    height: 60%;
    fill: ${palette.lotusTheme.primary};
    stroke: ${palette.lotusTheme.primary};
    ${sidebarTransition};
  }

  /* hover styles */
  &:hover {
    border-bottom-color: ${palette.lotusTheme.secondary};
    color: ${palette.lotusTheme.secondary};

    &:before {
      opacity: 1;
    }

    &:after {
      background-color: ${palette.lotusTheme.secondary};
      left: 0;
      right: 0;
    }

    svg {
      fill: ${palette.lotusTheme.secondary};
      stroke: ${palette.lotusTheme.secondary};
    }
  }
`;

const HoverText = styled.span`
  position: absolute;
  top: 50%;
  left: 75px;
  transform: translateY(-50%);
  font-size: 1.25em;
`;

export default ({ text, route, children }) => (
  <SidebarButton onClick={() => Router.push(`${route}`)}>
    {children}
    <HoverText>{text}</HoverText>
  </SidebarButton>
);
