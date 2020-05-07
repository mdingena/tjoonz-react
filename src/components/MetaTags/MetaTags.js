import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const MetaTags = ({ title, description, canonicalUrl }) => (
  <>
    {title && (
      <Helmet>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='twitter:title' content={title} />
      </Helmet>
    )}
    {description && (
      <Helmet>
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta name='twitter:description' content={description} />
      </Helmet>
    )}
    {canonicalUrl && (
      <Helmet>
        <link rel='canonical' href={canonicalUrl} />
        <meta property='og:url' content={canonicalUrl} />
      </Helmet>
    )}
  </>
);

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string
};

export default MetaTags;
