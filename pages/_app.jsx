import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import { makeStore } from '../state/store';

class MandachordApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps}></Component>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MandachordApp);