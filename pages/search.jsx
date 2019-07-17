import styled from 'styled-components';
import Page from '../layouts/main';
import palette from '../styles/palette';
import { withRouter } from 'next/router';

const Title = styled.h1`
  color: ${palette.lotusTheme.accent};
  font-family: 'Teko', sans-serif;
`;

export default withRouter(() => (
  <Page>
    <Title>Searching for the search page...</Title>
  </Page>
));
