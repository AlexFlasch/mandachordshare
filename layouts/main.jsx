import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import palette from '../palette';

const ContentContainer = styled.div`
  box-sizing: border-box;
  padding-left: 75px;
  padding-top: 25px;
  background-color: ${palette.lotusTheme.bg};
  width: 100%;
  min-height: 100vh;

  * {
    margin: 0;
  }
`;

export default ({children}) => (
  <>
    <Sidebar />
    <ContentContainer>
      {children}
    </ContentContainer>
  </>
);