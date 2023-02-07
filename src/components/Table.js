import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { modExpenses, expenses } = this.props;

    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    return modExpenses(filteredExpenses);
  };

  render() {
    const { expenses, handleEdit } = this.props;
    return (
      <table className="wallet-table">
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
                  data-testid="edit-btn"
                  className="edit-btn"
                  onClick={ () => handleEdit(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  className="delete-btn"
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

const mapDispatchToProps = (dispatch) => ({
  modExpenses: (expenses) => dispatch(editExpenses(expenses)),
});

Table.propTypes = {
  expenses: PropTypes.array,
  modExpenses: PropTypes.func,
  handleEdit: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Table);
