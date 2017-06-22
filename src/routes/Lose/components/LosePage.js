import React, { Component } from 'react';
import './LosePage.scss';
import LinkButton from '../../../components/LinkButton/LinkButton';

class LosePage extends Component {
  render() {
    return (
      <div className="lose-page">
        <h2>You lose</h2>
        <div className="info">
          <div>
            <h3>Clicks count:</h3>
            <p>{this.props.location.state.clicks}</p>
          </div>
        </div>

        <div className="buttons">
          <LinkButton text='Select easier level' to='/'/>
          <LinkButton text='Try again' to='gameBoard'/>
        </div>

      </div>
    );
  }
}

export default LosePage;
