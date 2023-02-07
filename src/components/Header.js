import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../images/logo_trybewallet.svg';
import coins from '../images/coins.svg';
import user from '../images/user.svg';

class Header extends Component {
  render() {
    const { email, totalExpenses, defaultTotal } = this.props;
    return (
      <header>
        <img
          src={ logo }
          alt="TrybeWallet logo"
          className="wallet-logo"
        />
        <section className="currency-section">
          <img
            src={ coins }
            alt="Moedas"
          />
          <span className="total-expenses">Total de despesas:</span>
          <span
            data-testid="total-field"
            className="total-field"
          >
            {
              !totalExpenses
                ? `${defaultTotal.toFixed(2)}` : `${totalExpenses.toFixed(2)}`
            }
          </span>
          <span
            data-testid="header-currency-field"
            className="brl"
          >
            BRL
          </span>
        </section>
        <section className="user-section">
          <img
            src={ user }
            alt="Foto de usuário"
          />
          <span
            data-testid="email-field"
            className="email-field"
          >
            { email }
          </span>
        </section>
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
