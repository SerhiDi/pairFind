import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import './LinkButton.scss';

class LinkButton extends Component {
  render() {
    return (
      <Link to={this.props.to} onClick={this.props.handler}>
        <button type="button" className="button link-button">
          {this.props.text}
        </button>
      </Link>
    );
  }
}

LinkButton.propTypes = {
  handler: PropTypes.func,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkButton;
