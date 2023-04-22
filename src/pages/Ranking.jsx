import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ranking extends Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        Ranking
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.goHome }
        >
          Inicio

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
