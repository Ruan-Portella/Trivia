import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import TriviaLogo from '../images/trivia.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const picture = md5(gravatarEmail).toString();
    return (
      <div className="Header-Content">
        <div className="Header-Left">
          <div className="Header-Logo">
            <img className="TriviaLogoHeader" src={ TriviaLogo } alt="logo" />
          </div>
        </div>
        <div className="Header-Right">
          <div className="Header-Player">
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${picture}` } alt="" />
            <p data-testid="header-player-name">{ name }</p>
          </div>
          <div>
            <span data-testid="header-score" className="Score">
              <AiFillStar fill="orange" size={ 50 } />
              <span className="iconScore" />
              {`Pontos: ${score} `}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
