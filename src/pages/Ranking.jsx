import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiFillStar } from 'react-icons/ai';
import TriviaLogo from '../images/trivia.png';
import '../styles/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    localRanking.sort((a, b) => b.score - a.score);
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
      <div className="Ranking-Main">
        <img className="TriviaLogoRanking" src={ TriviaLogo } alt="logo" />
        <section className="ranking-content">
          <section className="ranking-title">
            <h1 data-testid="ranking-title">Ranking</h1>
          </section>
          <section className="ranking-users">
            <ul className="ul-ranking">
              {
                ranking.map((player, index) => (
                  <li key={ index } className="li-ranking">
                    <section className="player-info">
                      <section>
                        <img className="player-image" src={ `https://www.gravatar.com/avatar/${player.picture}` } alt={ player.name } />
                      </section>
                      <section className="player-name">
                        <p
                          data-testid={ `player-name-${index}` }
                        >
                          {player.name}

                        </p>

                      </section>
                    </section>
                    <section>
                      <span data-testid="header-score" className="Score-ranking">
                        <AiFillStar fill="orange" size={ 50 } />
                        <p
                          className="iconScoreRanking"
                          data-testid={ `player-score-${index}` }
                        >
                          {` Pontos: ${player.score} `}
                        </p>
                      </span>
                    </section>
                  </li>
                ))
              }
            </ul>
          </section>
          <section className="btn-ranking">
            <button
              className="cta"
              data-testid="btn-go-home"
              type="button"
              onClick={ this.goHome }
            >
              Jogar Novamente
            </button>
          </section>
        </section>
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
