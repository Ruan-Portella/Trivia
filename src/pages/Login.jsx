import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
  };

  isDisabled = () => true;

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
          <input
            value={ userName }
            type="text"
            name="userName"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userEmail">
          <input
            value={ userEmail }
            type="email"
            name="userEmail"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ this.isDisabled() }
        >
          Play

        </button>
      </div>
    );
  }
}
