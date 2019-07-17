import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class StyledComponentsDocument extends Document {
  // extend next.js document to tell it to expect styles
  // from styled-components in both server and client
  // as opposed to default styled-jsx styles

  bodyStyle = {
    margin: 0
  };

  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(Index => props =>
      sheet.collectStyles(<Index {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Oswald|Teko"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body style={this.bodyStyle}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
