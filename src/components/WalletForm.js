import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {methodOptions.map((elem) => <option key={ elem }>{elem}</option>)}
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {tagOptions.map((elem) => <option key={ elem }>{elem}</option>)}
          </select>
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
