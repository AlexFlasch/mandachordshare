import { Component } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Page from '../layouts/main';
import palette from '../styles/palette';
import { connect } from 'react-redux';

import Mandachord from '../components/mandachord';

const Title = styled.h1`
  color: ${palette.lotusTheme.accent};
  font-family: 'Teko', sans-serif;
`;

class IndexPage extends Component {
  static async getInitialProps({ store, isServer, pathName, query }) {
    this.isServer = isServer;
  }

  render() {
    return (
      <Page>
        <Title>I'm Home!</Title>
        {this.isServer ? null : <Mandachord />}
      </Page>
    );
  }
}

export default connect()(IndexPage);
