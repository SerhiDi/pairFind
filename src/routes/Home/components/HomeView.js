import React, { Component } from 'react';
import './HomeView.scss';
import PropTypes from 'prop-types';
import LinkButton from '../../../components/LinkButton/LinkButton';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {boardSize, gameTime, hintTime} = this.props.settings;

    return (
      <div className="settings">
        <h2>Remember the location of pictures and find all pairs</h2>

        <div className="options">
          <div className="option-block">
            <h3>Board size</h3>
            <select onChange={(e) => {
              this.props.setBoardSize(e.target.value)
            }} value={boardSize}>
              <option value='16'>4x4</option>
              <option value='36'>6x6</option>
              <option value='64'>8x8</option>
            </select>
          </div>

          <div className="option-block">
            <h3>Game time</h3>
            <select onChange={(e) => {
              this.props.setGameTime(e.target.value)
            }} value={gameTime}>
              <option value='60'>1 minute</option>
              <option value='120'>2 minutes</option>
              <option value='300'>5 minutes</option>
            </select>
          </div>

          <div className="option-block">
            <h3>Hint time</h3>
            <select onChange={(e) => {
              this.props.setHintTime(e.target.value)
            }} value={hintTime}>
              <option value='2'>2 seconds</option>
              <option value='5'>5 seconds</option>
              <option value='10'>10 seconds</option>
            </select>
          </div>
        </div>

        <p className="game-button">
          <LinkButton text="Start game" to='gameBoard'/>
        </p>

      </div>
    );
  }
}

HomeView.propTypes = {
  setGameTime: PropTypes.func,
  setHintTime: PropTypes.func,
  setBoardSize: PropTypes.func,
  settings: PropTypes.shape({
    boardSize: PropTypes.number,
    gameTime: PropTypes.number,
    hintTime: PropTypes.number
  })
};

export default HomeView;
