import React from 'react';
import PropTypes from 'prop-types';
import './PageLayout.scss';

export const PageLayout = ({children}) => (
  <div className="container text-center">
    <h1>PairFind</h1>
    {children}
  </div>
);
PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
