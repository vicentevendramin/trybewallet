import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { removeExpense, expenses } = this.props;

    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    return removeExpense(filteredExpenses);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ parseFloat(expense.value).toFixed(2) }</td>
              <td>{ (expense.exchangeRates[expense.currency].name) }</td>
              <td>
                { parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2) }
              </td>
              <td>
                { (parseFloat(expense.exchangeRates[expense.currency]
                  .ask) * expense.value).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                >
                  Editar despesa
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expenses) => dispatch(deleteExpense(expenses)),
});

Table.propTypes = {
  expenses: PropTypes.array,
  removeExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
