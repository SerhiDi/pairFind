import React, { Component } from 'react';
import './ResultPage.scss';
import LinkButton from '../../../components/LinkButton/LinkButton';

class ResultPage extends Component {

  formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <div className="result-page">
        <h2>You Win</h2>
        <div className="info">
          <div>
            <h3>Clicks count:</h3>
            <p>{this.props.location.state.clicks}</p>
          </div>
          <div>
            <h3>Time:</h3>
            <p>{this.formatSeconds(this.props.location.state.time)}</p>
          </div>
        </div>

        <div className="buttons">
          <LinkButton text='Select hardest level' to='/'/>
          <LinkButton text='Try again' to='gameBoard'/>
        </div>

      </div>
    );
  }
}

export default ResultPage;
