import React, { Component } from 'react';

export default class Login extends Component {
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

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <label htmlFor="userName">
          Nome de Usuario
          <input
            value={ userName }
            type="text"
            name="userName"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="userEmail">
          Email
          <input
            value={ userEmail }
            type="email"
            name="userEmail"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ this.isDisabled() }
          data-testid="btn-play"
        >
          Play

        </button>
      </div>
    );
  }
}
