<<<<<<< HEAD
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const localRanking = localStorage.getItem('ranking');
    this.setState({
      ranking: localRanking,
    });
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1>Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt={ player.name } />
            <p
              data-testid={ `player-name-${index}` }
            >
              {player.name}

            </p>
            <p
              data-testid={ `player-score-${index}` }
            >
              {player.score}

            </p>
          </div>
        ))}

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

export default Ranking;
=======
import React, { Component } from 'react';

export default class Ranking extends Component {
  render() {
    return (
      <p data-testid="ranking-title">Ranking</p>
    );
  }
}
>>>>>>> main-group-6
