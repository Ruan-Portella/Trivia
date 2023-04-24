import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TriviaLogo from '../images/trivia.png';
import { newSettings } from '../redux/actions';
import '../styles/Settings.css';

class Settings extends Component {
  state = {
    amount: 5,
    category: '',
    difficulty: '',
    type: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = () => {
    const { amount, category, difficulty, type } = this.state;
    const { dispatch, history } = this.props;
    dispatch(newSettings(amount, category, difficulty, type));
    history.push('/');
  };

  render() {
    const { amount, category, difficulty, type } = this.state;
    return (
      <div className="Settings-Main">
        <img className="TriviaLogoSettings" src={ TriviaLogo } alt="logo" />
        <form className="settings-content" onSubmit={ this.handleSubmit }>
          <section className="settings-title">
            <h1>Settings</h1>
          </section>
          <section className="settings-input">
            <select
              name="amount"
              value={ amount }
              onChange={ this.handleChange }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <select
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
            <select
              name="difficulty"
              value={ difficulty }
              onChange={ this.handleChange }
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select
              name="type"
              value={ type }
              onChange={ this.handleChange }
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
            <section className="btn-ranking">
              <button
                className="cta"
                data-testid="btn-go-home"
                type="submit"
              >
                Jogar
              </button>
            </section>
          </section>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Settings);
