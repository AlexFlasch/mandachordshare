import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';

import { makeStore } from '../state/store';

// Clean this up later?
// Unsure if there's a better way to make the store available to non-components like song-builder
let store;

class MandachordApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    ({ store } = this.props);

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export { store };

export default withRedux(makeStore)(MandachordApp);
