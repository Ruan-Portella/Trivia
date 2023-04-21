import { connect } from 'react-redux';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    const QuestionsAssertion3 = 3;
    const { assertions } = this.props;
    if (assertions < QuestionsAssertion3) {
      this.setState({
        message: 'Could be better...',
      });
    } else if (assertions >= QuestionsAssertion3) {
      this.setState({
        message: 'Well Done!',
      });
    }
  }

  playAgain = () => {
    const { history } = this.props;

    history.push('/');
  };

  render() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const { message } = this.state;
    const picture = md5(gravatarEmail).toString();
    return (
      <section>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${picture}` } alt="" />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ score }</span>
        <p data-testid="feedback-text">{message}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          data-testid="btn-play-again"
          onClick={ () => this.playAgain() }
        >
          Play Again

        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
