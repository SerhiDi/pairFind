import React, { Component } from 'react';
import QuestionMark from './assets/question_mark.png';
import { connect } from 'react-redux';
import { clickOnCell } from '../../modules/gameBoard';

import PropTypes from 'prop-types';

class Cell extends Component {

  render() {
    const { cell, index } = this.props;

    return (
      <li className={(cell.complete ? 'opacity' : '') + ' cell'}>
        {cell.show ? (
          <img src={require('./assets/' + cell.index + '.jpg')} alt="image" draggable="false"/>) :
          (<img src={QuestionMark} alt="question mark" onClick={() => {
              this.props.clickOnCell(cell, index)
            }} draggable="false"/>
          )}
        {cell.index}
      </li>
    )
  }
}

Cell.propTypes = {
  cell: PropTypes.shape({
    complete: PropTypes.bool
  })
};

// const mapStateToProps = (state) => ({
//   home: state.home
// });

const mapDispatchToProps = {
  clickOnCell
};

export default connect(null, mapDispatchToProps)(Cell);
