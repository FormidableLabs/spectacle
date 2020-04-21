import React from 'react';
import PropTypes from 'prop-types';

const CustomDocument = ({ Html, Head, Body, children }) => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          name="description"
          content="A React.js based library for creating sleek presentations using JSX syntax."
        />
        <meta property="og:title" content="spectacle Documentation" />
        <meta property="og:site_name" content="spectacle Documentation" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://www.formidable.com/open-source/spectacle/"
        />
        <meta property="og:image" content="./static/og-image.png" />
        <meta
          property="og:description"
          content="A React.js based library for creating sleek presentations using JSX syntax."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon/Favicon32.png"
        />
        <link rel="manifest" href="./site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ff4081" />
        <meta name="msapplication-config" content="./browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <link
          href="https://fonts.googleapis.com/css?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
        <title>spectacle Documentation</title>
      </Head>
      <Body>
        <div id="content">{children}</div>
      </Body>
    </Html>
  );
};

CustomDocument.propTypes = {
  Body: PropTypes.func.isRequired,
  Head: PropTypes.func.isRequired,
  Html: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default CustomDocument;
