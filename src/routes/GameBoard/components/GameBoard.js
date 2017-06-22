import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './GameBoard.scss';
import QuestionMark from '../assets/question_mark.png';
import PropTypes from 'prop-types';
import { createCells, getBoardWidth, checkWin } from './helpers';
import soundFile from '../../../audio/click.mp3';
import LinkButton from '../../../components/LinkButton/LinkButton';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: this.props.home.gameTime,
      hintTime: this.props.home.hintTime,
      clicks: 0
    };
    this.boardSize = this.props.home.boardSize;
    this.cells = createCells(this.boardSize);
    this.boardWidth = getBoardWidth(this.boardSize);
    this.firstSelectedCell = null;
    this.secondSelectedCell = null;
  }

  componentWillMount() {
    this.audio = new Audio(soundFile);
    this.showHint();
  }

  componentDidMount() {
    this.hintTimeout = setTimeout(() => {
      this.hideHint();
      this.runTimer();
    }, (this.props.home.hintTime + 1) * 1000);
  }

  runTimer() {
    this.setState({hintTime: null});
    this.countdownTimer = setInterval(() => {
      if (this.state.countdown === 0) {
        this.gameOver();
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

    this.cells.forEach((cell) => {
      cell.show = true;
    });
  }

  hideHint() {
    clearInterval(this.hintTimer);
    this.cells.forEach((cell) => {
      cell.show = false;
    });
  }

  gameOver() {
    clearInterval(this.countdownTimer);
    browserHistory.push({
      pathname: 'losePage',
      state: {
        clicks: this.state.clicks
      }
    });
  }

  win() {
    let allComplete = checkWin(this.cells);
    if (allComplete) {
      clearInterval(this.countdownTimer);

      setTimeout(() => {
        browserHistory.push({
          pathname: 'winPage',
          state: {
            clicks: this.state.clicks,
            time: this.props.home.gameTime - this.state.countdown
          }
        });
      }, 500);
    }
  }

  clickOnCell(cell) {
    this.audio.play();
    this.setState({clicks: this.state.clicks + 1});
    cell.show = true;

    if (!this.firstSelectedCell) {
      this.firstSelectedCell = cell.index;
    } else {
      this.secondSelectedCell = cell.index;
    }

    if (this.firstSelectedCell && this.secondSelectedCell) {
      if (this.firstSelectedCell === this.secondSelectedCell) {
        this.cells.forEach((cell) => {
          if (cell.index === this.firstSelectedCell && this.secondSelectedCell) {
            cell.complete = true;
          }
        });

        this.win();

      } else {
        setTimeout(() => {
          this.cells.forEach((cell) => {
            if (!cell.complete) {
              cell.show = false;
            }
          });
        }, 300);
      }

      this.firstSelectedCell = null;
      this.secondSelectedCell = null;
    }
  }

  formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {

    return (
      <div className="game-board">
        <div className="info">
          <div className="info-block">
            <h3>Time left:</h3> {this.formatSeconds(this.state.countdown)}
          </div>
          <div className="info-block">
            <h3>Clicks:</h3> {this.state.clicks}
          </div>
        </div>

        {this.state.countdown <= 10 ? (<p className="hurry-up">Hurry up!</p>) :
          this.state.hintTime > 0 ? <p className="hint-time">{this.state.hintTime}</p> :
            this.state.hintTime === 0 ? <p className="hint-time">Go!</p> :
              <p className="hint-time">&nbsp;</p> }

        <ul className={this.boardWidth + ' cells'}>
          {
            this.cells.map((cell, i) => {
              return (
                <li key={i} className={(cell.complete ? 'opacity' : '') + ' cell'}>
                  {cell.show ? (<img src={require('../assets/' + cell.index + '.jpg')} alt="image" draggable="false"/>) :
                    (<img src={QuestionMark} alt="question mark" onClick={this.clickOnCell.bind(this, cell)} draggable="false"/>)}
                </li>
              );
            })
          }
        </ul>

        <p className="cancel-game">
          <LinkButton text="Cancel game" to='/'/>
        </p>

      </div>
    );
  }
}

GameBoard.propTypes = {
  home: PropTypes.shape({
    boardSize: PropTypes.number,
    gameTime: PropTypes.number,
    hintTime: PropTypes.number
  })
};

export default GameBoard;
