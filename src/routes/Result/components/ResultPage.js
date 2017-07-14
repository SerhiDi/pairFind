import React, { Component } from 'react';
import './ResultPage.scss';
import LinkButton from '../../../components/LinkButton/LinkButton';
import { formatSeconds } from '../../helpers';

class ResultPage extends Component {

  render() {
    return (
      <div className="result-page">
        {
          this.props.gameResult === 'win' ?
            <h2 className="win">You Win</h2> :
            <h2 className="lose">You Lose</h2>
        }
        <div className="info">
          <div>
            <h3>Clicks count:</h3>
            <p>{this.props.clicks}</p>
          </div>

          {
            this.props.gameResult === 'win' ?
              <div>
                <h3>Time:</h3>
                <p>{formatSeconds(this.props.gameTime)}</p>
              </div> : ''
          }

        </div>

        <div className="buttons">
          <LinkButton text='Change game options' to='/'/>
          <LinkButton text='Try again' to='gameBoard'/>
        </div>

      </div>
    );
  }
}

export default ResultPage;
