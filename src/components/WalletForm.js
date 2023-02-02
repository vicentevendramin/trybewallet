import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, fetchExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
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

  handleSubmit = () => {
    const { fetchWalletExpenses } = this.props;
    fetchWalletExpenses(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
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
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  fetchWalletExpenses: (expenses) => dispatch(fetchExpenses(expenses)),
});

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func,
  fetchExpenses: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
