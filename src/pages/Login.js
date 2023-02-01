import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    const validateEmail = (userEmail) => {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regexEmail.test(userEmail);
    };

    const validatePassword = (userPassword) => {
      const minLength = 6;
      return userPassword.length >= minLength;
    };

    return (
      <form
        className="login-form"
      >
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            id="email-input"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !(validateEmail(email) && validatePassword(password)) }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
