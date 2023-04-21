import { connect } from 'react-redux';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const picture = md5(gravatarEmail).toString();
    return (
      <section>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${picture}` } alt="" />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ score }</span>
        <p data-testid="feedback-text">Feedback</p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
