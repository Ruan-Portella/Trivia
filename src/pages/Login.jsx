import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CiSettings } from 'react-icons/ci';
import { addUserAction, removeScore } from '../redux/actions/index';
import TriviaLogo from '../images/trivia.png';
import '../styles/Login.css';

class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
  };

  isDisabled = () => {
    const { userEmail, userName } = this.state;
    const enableBtn = userEmail.length > 0 && userName.length > 0;
    return !enableBtn;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  getToken = async () => {
    const { history, dispatch } = this.props;
    const { userName, userEmail } = this.state;
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const getApi = await fetch(URL);
    const response = await getApi.json();
    this.saveToken(response.token);
    dispatch(addUserAction(userName, userEmail));
    dispatch(removeScore());
    history.push('/game');
  };

  render() {
    const { userName, userEmail } = this.state;
    return (
      <section className="login-content">
        <div className="left-content">
          <img className="TriviaLogo" src={ TriviaLogo } alt="logo" />
        </div>
        <div className="right-content">
          <div className="form-content">
            <label htmlFor="userName">
              <input
                value={ userName }
                placeholder="Qual é o seu nome?"
                type="text"
                name="userName"
                onChange={ this.handleChange }
                data-testid="input-player-name"
                maxLength={ 16 }
              />
            </label>
            <label htmlFor="userEmail">
              <input
                value={ userEmail }
                placeholder="Qual é o seu e-mail do gravatar?"
                type="email"
                name="userEmail"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
            <button
              className={ this.isDisabled() ? 'cta disable' : 'cta' }
              type="button"
              disabled={ this.isDisabled() }
              data-testid="btn-play"
              onClick={ this.getToken }
            >
              Play
            </button>
            <button
              className="cta"
              onClick={ () => {
                const { history } = this.props;
                history.push('/settings');
              } }
              type="button"
              data-testid="btn-settings"
            >
              <CiSettings size={ 20 } />
              Settings
            </button>
            {
              this.isDisabled() && (<p>Insira um email e/ou nome válido</p>)
            }
          </div>
          <span>NEXT</span>
          <span />
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
