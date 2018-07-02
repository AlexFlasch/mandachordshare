import styled from 'styled-components';
import { withRouter } from 'next/router';
import Mandachord from '../components/mandachord';
import Page from '../layouts/main';
import palette from '../palette';

const Title = styled.h1`
  color: ${palette.lotusTheme.accent};
  font-family: 'Teko', sans-serif;
`;

export default withRouter(() => (
  <Page>
    <Title>I'm Home!</Title>
    <Mandachord />
  </Page>
));