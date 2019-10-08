import React, { Component } from 'react';
import Page from '../layouts/main';
import { connect } from 'react-redux';

import Mandachord from '../components/mandachord';

class IndexPage extends Component {
  static async getInitialProps({ isServer }) {
    console.log('isServer: ', isServer);
    this.isServer = isServer;
  }

  render() {
    return <Page>{this.isServer ? null : <Mandachord />}</Page>;
  }
}

export default IndexPage;
