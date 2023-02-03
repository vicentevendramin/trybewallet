import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => (
      acc + parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask)
    ), 0);
    const defaultTotal = 0;
    return (
      <>
        <header>
          <h2>TrybeWallet</h2>
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
        <WalletForm />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
