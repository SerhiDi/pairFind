import React, { Component } from 'react';
import './GameBoard.scss';
import PropTypes from 'prop-types';
import LinkButton from '../../../components/LinkButton/LinkButton';
import Cell from './Cell/Cell';
import { formatSeconds } from '../../helpers';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: this.props.settings.gameTime,
      hintTime: this.props.settings.hintTime
    };
  }

  componentWillMount() {
    this.props.resetGame();
    const {boardSize} = this.props.settings;
    this.props.createCells(boardSize);
    this.showHint();
  }

  componentDidMount() {
    this.hintTimeout = setTimeout(() => {
      this.hideHint();
      this.runTimer();
    }, (this.props.settings.hintTime + 1) * 1000);
  }

  runTimer() {
    this.setState({hintTime: null});
    this.countdownTimer = setInterval(() => {
      if (this.state.countdown === 0) {
        clearInterval(this.countdownTimer);
        this.props.openResultPage('lose');
      } else {
        this.setState({countdown: this.state.countdown - 1});
        this.props.updateGameTime(this.props.settings.gameTime - this.state.countdown)
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countdownTimer);
    clearTimeout(this.hintTimeout);
    clearInterval(this.hintTimer);
  }

  showHint() {
    this.hintTimer = setInterval(() => {
      this.setState({hintTime: this.state.hintTime - 1});
    }, 1000);
    this.props.showAllImages(true);
  }

  hideHint() {
    clearInterval(this.hintTimer);
    this.props.showAllImages(false);
  }

  render() {
    return (
      <div className="game-board">
        <div className="info">
          <div className="info-block">
            <h3>Time left:</h3> {formatSeconds(this.state.countdown)}
          </div>
          <div className="info-block">
            <h3>Clicks:</h3> {this.props.clicks}
          </div>

          <div>
            {this.state.countdown <= 10 ? (<p className="hurry-up">Hurry up!</p>) :
              this.state.hintTime > 0 ? <p className="hint-time">{this.state.hintTime}</p> :
                this.state.hintTime === 0 ? <p className="hint-time">Go!</p> :
                  <p className="hint-time">&nbsp;</p> }
          </div>

        </div>

        <ul className={('cells-' + Math.sqrt(this.props.settings.boardSize)) + ' cells'}>
          {
            this.props.cells.map((cell, i) => {
              return (
                <Cell cell={cell} key={i} index={i}/>
              );
            })
          }
        </ul>

        <p className="cancel-game">
          <LinkButton text="Cancel game" to="/"/>
        </p>

      </div>
    );
  }
}

GameBoard.propTypes = {
  settings: PropTypes.shape({
    boardSize: PropTypes.number,
    gameTime: PropTypes.number,
    hintTime: PropTypes.number
  }),
  clicks: PropTypes.number
};

export default GameBoard;
