import React, { Component } from 'react';
import QuestionMark from './assets/question_mark.png';
import { connect } from 'react-redux';
import { clickOnCell } from '../../modules/gameBoard';
import soundFile from './audio/click.mp3';
import PropTypes from 'prop-types';
const audio = new Audio(soundFile);

class Cell extends Component {
  playSound() {
    audio.play();
  }

  render() {
    const {cell, index} = this.props;

    return (
      <li className={(cell.complete ? 'opacity' : '') + ' cell'}>
        {cell.show ? (
          <img src={require('./assets/' + cell.index + '.jpg')} alt="image" draggable="false"/>) :
          (<img src={QuestionMark}
                alt="question mark"
                onClick={() => {
                  this.playSound();
                  this.props.clickOnCell(cell, index)
                }} draggable="false"/>
          )}
      </li>
    )
  }
}

Cell.propTypes = {
  cell: PropTypes.shape({
    complete: PropTypes.bool
  }),
  clickOnCell: PropTypes.func
};

const mapDispatchToProps = {
  clickOnCell
};

export default connect(null, mapDispatchToProps)(Cell);
