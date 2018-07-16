import styled from 'styled-components';
import { withRouter } from 'next/router';
import SidebarButton from './sidebar-button';
import HomeIcon from '../../assets/Lotus_Icon.svg';
import SearchIcon from '../../assets/MagnifyingGlass.svg';
import palette from '../../palette';

const sidebarClosedWidth = 50;
const sidebarOpenWidth = 200;
const sidebarTransition = `
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: ${sidebarClosedWidth}px;
  height: 100vh;
  background-color: ${palette.lotusTheme.bg};
  border-right: 1px solid ${palette.lotusTheme.primary};
  overflow-x: hidden;
  z-index: 1;
  ${sidebarTransition}

  &:hover {
    width: ${sidebarOpenWidth}px;
  }
`;

export default withRouter(() => {
  const buttons = [
    {
      name: 'Home',
      route: '/',
      className: 'home-btn',
      icon: <HomeIcon />
    },
    {
      name: 'Search',
      route: '/search',
      className: 'search-btn',
      icon: <SearchIcon />
    }
  ];

  const renderButton = (button, i) => (
    <SidebarButton
      key={i}
      route={button.route}
      text={button.name}
    >
      {button.icon}
    </SidebarButton>
  )

  return (
    <SidebarContainer>
      {buttons.map((btn, i) => renderButton(btn, i))}
    </SidebarContainer>
  );
});