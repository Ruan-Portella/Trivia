import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const picture = md5(gravatarEmail).toString();
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${picture}` } alt="" />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ score }</span>

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
