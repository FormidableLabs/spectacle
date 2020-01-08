import React from 'react';
import PropTypes from 'prop-types';
import { metaData } from './constants';

class CustomDocument extends React.Component {
  render() {
    const { Html, Head, Body, children, renderMeta } = this.props;
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="description" content={metaData.description} />
          <meta property="og:title" content={metaData.title} />
          <meta property="og:site_name" content={metaData.title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={metaData.url} />
          <meta property="og:image" content="./static/og-image.png" />
          <meta property="og:description" content={metaData.description} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="./static/favicon/favicon-32.png"
          />
          <link rel="manifest" href="./static/favicon/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#ff4081" />
          <meta
            name="msapplication-config"
            content="./static/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          {renderMeta.styleTags}
          <title>{metaData.title}</title>
        </Head>
        <Body>
          <div id="content">{children}</div>
        </Body>
      </Html>
    );
  }
}

CustomDocument.propTypes = {
  Body: PropTypes.func,
  Head: PropTypes.func,
  Html: PropTypes.func,
  children: PropTypes.object,
  renderMeta: PropTypes.object
};

export default CustomDocument;
