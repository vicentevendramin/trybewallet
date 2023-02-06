import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses, defaultTotal } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <br />
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">
          {
            !totalExpenses
              ? `${defaultTotal.toFixed(2)}` : `${totalExpenses.toFixed(2)}`
          }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  totalExpenses: PropTypes.number,
  defaultTotal: PropTypes.number,
}.isRequired;

export default Header;
