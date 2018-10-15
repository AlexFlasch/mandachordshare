import { Component } from 'react';
import styled from 'styled-components';
import Mandachord from '../components/mandachord';
import Page from '../layouts/main';
import palette from '../palette';
import { connect } from 'react-redux';

const Title = styled.h1`
  color: ${palette.lotusTheme.accent};
  font-family: 'Teko', sans-serif;
`;

class IndexPage extends Component {
  static async getInitialProps({ store, isServer, pathName, query }) {

  }

  render() {
    return (
      <Page>
        <Title>I'm Home!</Title>
        <Mandachord />
      </Page>
    );
  }
}

export default connect()(IndexPage);