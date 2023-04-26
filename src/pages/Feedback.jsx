import { connect } from 'react-redux';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import TriviaLogo from '../images/trivia.png';
import { removeScore, removeSettings } from '../redux/actions';
import '../styles/Feedback.css';

class Feedback extends Component {
  state = {
    message: '',
    text: '',
  };

  componentDidMount() {
    const QuestionsAssertion3 = 3;
    const { assertions, dispatch } = this.props;
    if (assertions < QuestionsAssertion3) {
      this.setState({
        message: 'Could be better...',
        text: 'bad',
      });
    } else if (assertions >= QuestionsAssertion3) {
      this.setState({
        message: 'Well Done!',
        text: 'good',
      });
    }
    dispatch(removeSettings());
    setTimeout(() => {
      this.saveUserInRaking();
    }, 1);
  }

  getRanking = () => {
    const ranking = localStorage.getItem('ranking');
    return ranking ? JSON.parse(ranking) : [];
  };

  saveUserInRaking = () => {
    const { name, score, gravatarEmail } = this.props;
    const picture = md5(gravatarEmail).toString();
    const ranking = this.getRanking();
    const user = {
      name,
      score,
      picture,
    };
    const listRanking = [...ranking, user];
    localStorage.setItem('ranking', JSON.stringify(listRanking));
  };

  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(removeScore());
  };

  btnRanking = () => {
    const { history, dispatch } = this.props;
    history.push('/ranking');
    dispatch(removeScore());
  };

  render() {
    const { score, gravatarEmail, assertions } = this.props;
    const { message, text } = this.state;
    const picture = md5(gravatarEmail).toString();
    return (
      <section className="feedback-Main">
        <img className="TriviaLogoFeedback" src={ TriviaLogo } alt="logo" />
        <section className="feedback-content">
          <section className="feedback-userImage">
            <img className={ `userImage-${text}` } data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${picture}` } alt="" />
          </section>
          <section className="feedback-information">
            <section>
              <p
                className={ `feedback-message-${text}` }
                data-testid="feedback-text"
              >
                {message}

              </p>
            </section>
            <section>
              <span
                className="feedback-text"
                data-testid="feedback-total-score"
              >
                {` Você acertou ${assertions} questões`}

              </span>
              <span
                className="feedback-text"
                data-testid="feedback-total-question"
              >
                {`Um total de ${score} pontos`}

              </span>
            </section>
          </section>
        </section>
        <section className="feeback-btn">
          <button
            className="cta-feedback"
            data-testid="btn-play-again"
            onClick={ () => this.playAgain() }
          >
            Play Again

          </button>
          <button
            className="cta-feedback"
            data-testid="btn-ranking"
            onClick={ () => this.btnRanking() }
          >
            Ranking
          </button>
        </section>
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
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
