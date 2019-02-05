import { Component } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Page from '../layouts/main';
import palette from '../palette';
import { connect } from 'react-redux';

const Mandachord = dynamic(import('../components/mandachord'), { ssr: false });

const Title = styled.h1`
  color: ${palette.lotusTheme.accent};
  font-family: 'Teko', sans-serif;
`;

class IndexPage extends Component {
  static async getInitialProps({ store, isServer, pathName, query }) {}

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
