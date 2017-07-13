import React, { Component } from 'react';
import './GameBoard.scss';
import PropTypes from 'prop-types';
import soundFile from '../../../audio/click.mp3';
import LinkButton from '../../../components/LinkButton/LinkButton';
import Cell from './Cell/Cell';
import { formatSeconds, showAllImages } from '../modules/gameBoard';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: this.props.settings.gameTime,
      hintTime: this.props.settings.hintTime
    };

  }

  componentWillMount() {
    const {boardSize} = this.props.settings;
    this.props.createCells(boardSize);
    // this.audio = new Audio(soundFile);
    this.showHint();
  }

  componentDidMount() {
    this.hintTimeout = setTimeout(() => {
      console.log('time');
      this.hideHint();
      this.runTimer();
    }, (this.props.settings.hintTime + 1) * 1000);
  }

  runTimer() {
    this.setState({hintTime: null});
    this.countdownTimer = setInterval(() => {
      if (this.state.countdown === 0) {
        // this.gameOver();
      } else {
        this.setState({countdown: this.state.countdown - 1});
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
    this.props.cells.forEach(() => {
      showAllImages(index, true);
    });
  }

  hideHint() {
    clearInterval(this.hintTimer);
    this.props.cells.forEach((c, index) => {
      showAllImages(index, false);
    });
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
        </div>

        {this.state.countdown <= 10 ? (<p className="hurry-up">Hurry up!</p>) :
          this.state.hintTime > 0 ? <p className="hint-time">{this.state.hintTime}</p> :
            this.state.hintTime === 0 ? <p className="hint-time">Go!</p> :
              <p className="hint-time">&nbsp;</p> }

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
  clickOnCell: PropTypes.func,
  clicks: PropTypes.number
};

export default GameBoard;
