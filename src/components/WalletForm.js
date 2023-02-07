import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const {
      currencies,
      handleChange,
      handleSubmit,
      submitEdit,
      expense,
    } = this.props;
    const { value, currency, method, tag, description, editMode } = expense;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <form className="wallet-form">
        <section className="description-section">
          <label htmlFor="description-input">
            Descrição da despesa
            <input
              type="text"
              id="description-input"
              className="description-input"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="tag-input">
            Categoria da despesa
            <select
              id="tag-input"
              className="tag-input"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </section>
        <section className="value-section">
          <label htmlFor="value-input">
            Valor
            <input
              type="number"
              id="value-input"
              className="value-input"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select
              id="method-input"
              className="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ handleChange }
            >
              {methodOptions.map((elem) => <option key={ elem }>{elem}</option>)}
            </select>
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              id="currency-input"
              className="currency-input"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ handleChange }
            >
              {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
        </section>
        <section className="button-section">
          {editMode ? (
            <button
              type="button"
              className="submit-button"
              data-testid="edit-btn"
              onClick={ submitEdit }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              className="submit-button"
              onClick={ handleSubmit }
            >
              Adicionar despesa
            </button>
          )}
        </section>
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
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitEdit: PropTypes.func,
  expense: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
