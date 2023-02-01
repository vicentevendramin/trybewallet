import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends Component {
  render() {
    const { email } = this.props;

    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(Wallet);
